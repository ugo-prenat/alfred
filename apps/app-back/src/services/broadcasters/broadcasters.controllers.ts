import { IJwtPayload, PayloadContext, ensureError } from '@alfred/utils';
import { IRefreshTokenPayload, ILoginPayload } from './broadcasters.models';
import {
  APIError,
  Bot,
  Broadcaster,
  BroadcasterRole,
  Feature,
  FeatureName,
  IAPIFeature,
  IBot,
  IBroadcaster,
  IDBBot,
  IDBFeature,
  IFrontBot,
  IFrontBroadcaster,
  IRawBroadcaster,
  IRawFeature,
  ITwitchFetcherParams
} from '@alfred/models';
import {
  handleGetTwitchBroadcaster,
  makeTwitchFetcherParams
} from '../twitch/twitch.utils';
import {
  handleDeleteBroadcaster,
  handleGetBroadcasterById,
  handleGetBroadcasterByTwitchId,
  makeAPIBroadcasterToBroadcaster,
  makeAPIBroadcasterToFrontBroadcaster,
  makeAPIBroadcastersToBroadcasters,
  makeAccessTokens,
  makeRawBroadcaster
} from './broadcasters.utils';
import { logError, logger } from '@/utils/logger.utils';
import {
  handleGetBot,
  handleGetBotBy,
  handleGetMaybeBot,
  makeAPIBotToBot,
  makeAPIBotToFrontBot,
  makeDBBot,
  makeMaybeAPIBotToFrontBot
} from '../bots/bots.utils';
import mongoose from 'mongoose';
import { Context } from 'hono';
import { verify } from 'hono/jwt';
import { FEATURES_CONF, JWT_ALGORITHM } from '@alfred/constants';
import {
  handleEventSubSubscriptionAndUpdate,
  handleGetBroacasterFeatures,
  handleGetFeatureBy,
  makeAPIFeatureToFrontFeature,
  makeDbFeatureToFrontFeature,
  updateFeature
} from '../features/features.utils';
import { IUpdateFeaturePayload } from '../features/features.models';
import { UPDATE_BROADCASTER_FEATURE_PATH } from './broadcasters.routes';

// /!\ CETTE FONCTION NE MARCHE PLUS ET N'EST PLUS UTILISÉE /!\
export const createBroadcaster = (c: PayloadContext<ILoginPayload>) => {
  const { twitchToken } = c.req.valid('json');

  const fetcherParams: ITwitchFetcherParams =
    makeTwitchFetcherParams(twitchToken);

  return handleGetTwitchBroadcaster(fetcherParams)
    .then((twitchBroadcaster) => {
      const botId = new mongoose.Types.ObjectId();

      const newBroadcaster: IRawBroadcaster = makeRawBroadcaster(
        twitchBroadcaster,
        twitchToken,
        botId
      );

      return Broadcaster.create(newBroadcaster)
        .then(makeAPIBroadcasterToBroadcaster)
        .then((broadcaster: IBroadcaster) => {
          const newBot: IDBBot = makeDBBot(broadcaster, botId);

          return Bot.create(newBot)
            .then(makeAPIBotToBot)
            .then(async (bot: IBot) => {
              logger.info(
                `broadcaster '${broadcaster.name}' (${broadcaster.id}) and bot '${bot.name}' (${bot.id}) created`
              );

              const { accessToken, refreshToken } = await makeAccessTokens(
                broadcaster.id,
                broadcaster.role
              );

              return c.json({ accessToken, refreshToken }, 201);
            })
            .catch((err) => {
              logger.error(
                err,
                `error creating bot ${botId}, deleting broadcaster ${broadcaster.id}`
              );
              return handleDeleteBroadcaster(broadcaster.id)
                .then(() => c.json(logError(err), 500))
                .catch((err) => c.json(logError(err), err.status));
            })
            .catch((err: APIError) => c.json(logError(err), err.status));
        });
    })
    .catch((err: APIError) => c.json(logError(err), err.status));
};

export const getBroadcasters = (c: Context) => {
  const broadcasterId: string | undefined = c.req.query('broadcasterId');

  if (broadcasterId) return getBroadcaster(c);

  return Broadcaster.find()
    .then(makeAPIBroadcastersToBroadcasters)
    .then((broadcasters: IBroadcaster[]) => c.json(broadcasters))
    .catch((err) => c.json(logError(err), err.status));
};

export const getBroadcaster = (c: Context) => {
  const { method, url } = c.req.raw;
  const broadcasterIdQuery = c.req.query('broadcasterId');
  const broadcasterIdParam = c.req.param('broadcasterId');

  if (!broadcasterIdQuery && !broadcasterIdParam)
    return c.json({ error: 'broadcasterId required' }, 400);

  return handleGetBroadcasterById(broadcasterIdQuery || broadcasterIdParam)
    .then(makeAPIBroadcasterToBroadcaster)
    .then((broadcaster: IBroadcaster) => c.json(broadcaster))
    .catch((err) => {
      const error = new APIError('broadcaster not found', 400, {
        api: 'app-back',
        url,
        method,
        response: err,
        payload: { broadcasterId: broadcasterIdQuery || broadcasterIdParam }
      });
      return c.json(logError(error), error.status);
    });
};

export const refreshToken = (c: PayloadContext<IRefreshTokenPayload>) => {
  const { refreshToken } = c.req.valid('json');

  // pour plus de sécu, invalider le refresh token présent dans la req pour que le seul refresh token valide soit celui qui est renvoyé au client

  return verify(refreshToken, process.env.JWT_REFRESH_SECRET, JWT_ALGORITHM)
    .then(({ role, sub }: { role: BroadcasterRole; sub: string }) =>
      makeAccessTokens(sub, role)
        .then((tokens) => c.json(tokens))
        .catch((err) => c.json({ error: err.message }, 500))
    )
    .catch(() => c.json({ error: 'Invalid refresh token' }, 401));
};

export const loginBroadcaster = async (c: PayloadContext<ILoginPayload>) => {
  const { twitchToken } = c.req.valid('json');
  const fetcherParams = makeTwitchFetcherParams(twitchToken);

  try {
    const twitchBroadcaster = await handleGetTwitchBroadcaster(fetcherParams);
    const broadcaster: IFrontBroadcaster = await handleGetBroadcasterByTwitchId(
      twitchBroadcaster.id
    ).then(makeAPIBroadcasterToFrontBroadcaster);
    const bot: IFrontBot | null = await handleGetMaybeBot(
      broadcaster.botId.toString()
    ).then(makeMaybeAPIBotToFrontBot);

    const { accessToken, refreshToken } = await makeAccessTokens(
      broadcaster.id,
      broadcaster.role
    );
    return c.json({ broadcaster, bot, accessToken, refreshToken }, 200);
  } catch (err) {
    if (err instanceof APIError) return c.json(logError(err), err.status);
    return c.json(logError(ensureError(err)), 500);
  }
};

export const authBroadcaster = async (c: Context) => {
  const { sub }: IJwtPayload = c.get('jwt');

  try {
    const broadcaster: IFrontBroadcaster = await handleGetBroadcasterById(
      sub
    ).then(makeAPIBroadcasterToFrontBroadcaster);
    const bot = await handleGetBot(broadcaster.botId.toString()).then(
      makeAPIBotToFrontBot
    );

    return c.json({ broadcaster, bot }, 200);
  } catch (err) {
    if (err instanceof APIError) return c.json(logError(err), err.status);
    return c.json(logError(ensureError(err)), 500);
  }
};

export const getBroadcasterFeatures = async (c: Context) => {
  const broadcasterId = c.req.param('broadcasterId');

  try {
    const broadcasterBot = (await handleGetBotBy({ broadcasterId })).toObject();
    const broadcasterFeatures: IAPIFeature[] = await Feature.find({
      botId: broadcasterBot._id
    });

    const availableFeaturesConf = FEATURES_CONF.filter(
      (f) => f.availability !== 'inactive'
    );

    const promisedFeatures = handleGetBroacasterFeatures(
      availableFeaturesConf,
      broadcasterFeatures,
      broadcasterBot,
      broadcasterId
    );
    const features: IDBFeature[] = await Promise.all(promisedFeatures);

    return c.json(features.map(makeDbFeatureToFrontFeature), 200);
  } catch (err) {
    if (err instanceof APIError) return c.json(logError(err), err.status);
    return c.json(logError(ensureError(err)), 500);
  }
};

export const updateBroadcasterFeature = async (
  c: PayloadContext<
    IUpdateFeaturePayload,
    typeof UPDATE_BROADCASTER_FEATURE_PATH
  >
) => {
  const { broadcasterId, featureName } = c.req.param();
  const updateBody = c.req.valid('json');

  try {
    const broadcasterBot = await handleGetBotBy({ broadcasterId });

    const searchParams: Partial<IRawFeature> = {
      botId: broadcasterBot.get('_id'),
      name: featureName as FeatureName
    };

    const featureToUpdate = await handleGetFeatureBy(searchParams);

    if (featureToUpdate.get('type') === 'eventSub' && updateBody.status)
      return handleEventSubSubscriptionAndUpdate(
        c,
        featureToUpdate,
        updateBody.status === 'enabled' ? 'SUB' : 'UNSUB',
        updateBody,
        searchParams
      );

    const updatedFeature: IAPIFeature = await updateFeature(
      searchParams,
      updateBody
    );

    return c.json(makeAPIFeatureToFrontFeature(updatedFeature), 200);
  } catch (err) {
    if (err instanceof APIError) return c.json(logError(err), err.status);
    return c.json(logError(ensureError(err)), 500);
  }
};
