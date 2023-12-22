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
  makeAPIBroadcasterToBroadcaster,
  makeRawBroadcaster
} from './broadcasters.utils';
import { logError, logger } from '@/utils/logger.utils';
import { makeAPIBotToBot, makeDBBot } from '../bots/bots.utils';
import mongoose from 'mongoose';

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
            .then((bot: IBot) => {
              logger.info(
                `broadcaster '${broadcaster.name}' (${broadcaster.id}) and bot '${bot.name}' (${bot.id}) created`
              );
              return c.json({ broadcaster, bot }, 201);
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
