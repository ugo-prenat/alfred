import { IJwtPayload, PayloadContext, ensureError } from '@alfred/utils';
import { IRefreshTokenPayload, ILoginPayload } from './broadcasters.models';
import {
  APIError,
  Broadcaster,
  BroadcasterRole,
  Feature,
  FeatureName,
  IAPIFeature,
  IBroadcaster,
  IDBFeature,
  IFrontBot,
  IFrontBroadcaster
} from '@alfred/models';
import {
  handleGetTwitchBroadcaster,
  makeTwitchFetcherParams
} from '../twitch/twitch.utils';
import {
  handleGetBroadcasterById,
  handleGetBroadcasterByTwitchId,
  makeAPIBroadcasterToBroadcaster,
  makeAPIBroadcasterToFrontBroadcaster,
  makeAPIBroadcastersToBroadcasters,
  makeAccessTokens,
  updateBroadcasterTwitchToken
} from './broadcasters.utils';
import { logError } from '@/utils/logger.utils';
import {
  handleGetBot,
  handleGetBotBy,
  handleGetMaybeBot,
  makeAPIBotToFrontBot,
  makeMaybeAPIBotToFrontBot
} from '../bots/bots.utils';
import { Context } from 'hono';
import { verify } from 'hono/jwt';
import { FEATURES_CONF, JWT_ALGORITHM } from '@alfred/constants';
import {
  handleGetBroacasterFeatures,
  makeAPIFeatureToFrontFeature,
  makeDbFeatureToFrontFeature,
  updateFeature
} from '../features/features.utils';
import { IUpdateFeaturePayload } from '../features/features.models';
import { UPDATE_BROADCASTER_FEATURE_PATH } from './broadcasters.routes';

export const getBroadcasters = (c: Context) =>
  Broadcaster.find()
    .then(makeAPIBroadcastersToBroadcasters)
    .then((broadcasters: IBroadcaster[]) => c.json(broadcasters))
    .catch((err) => c.json(logError(err), err.status));

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

    await updateBroadcasterTwitchToken(
      { twitchId: twitchBroadcaster.id },
      twitchToken
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
    const broadcasterBot = (await handleGetBotBy({ broadcasterId })).toObject();

    const updatedFeature = await updateFeature(
      { botId: broadcasterBot._id, name: featureName as FeatureName },
      updateBody
    );

    return c.json(makeAPIFeatureToFrontFeature(updatedFeature), 200);
  } catch (err) {
    if (err instanceof APIError) return c.json(logError(err), err.status);
    return c.json(logError(ensureError(err)), 500);
  }
};
