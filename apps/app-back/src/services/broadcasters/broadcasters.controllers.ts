import { PayloadContext } from '@alfred/utils';
import { ICreateBroadcasterPayload } from './broadcasters.models';
import {
  APIError,
  Bot,
  Broadcaster,
  IBot,
  IBroadcaster,
  IDBBot,
  IRawBroadcaster,
  ITwitchFetcherParams
} from '@alfred/models';
import {
  handleGetTwitchBroadcaster,
  makeTwitchFetcherParams
} from '../twitch/twitch.utils';
import {
  handleDeleteBroadcaster,
  handleGetBroadcaster,
  makeAPIBroadcasterToBroadcaster,
  makeAPIBroadcastersToBroadcasters,
  makeAccessTokens,
  makeRawBroadcaster
} from './broadcasters.utils';
import { logError, logger } from '@/utils/logger.utils';
import { makeAPIBotToBot, makeDBBot } from '../bots/bots.utils';
import mongoose from 'mongoose';
import { Context } from 'hono';
import { decode } from 'hono/jwt';

export const createBroadcaster = (
  c: PayloadContext<ICreateBroadcasterPayload>
) => {
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

  return handleGetBroadcaster(broadcasterIdQuery || broadcasterIdParam)
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

export const refreshToken = (c: Context) => {
  const headerToken = c.req.header('Authorization');
  const token = headerToken?.split(' ')[1];

  if (!headerToken || !token)
    return c.json({ error: 'No token provided' }, 401);

  const { payload } = decode(token);

  return makeAccessTokens(payload.sub, payload.role)
    .then((tokens) => c.json(tokens))
    .catch((err) => c.json({ error: err.message }, 500));
};
