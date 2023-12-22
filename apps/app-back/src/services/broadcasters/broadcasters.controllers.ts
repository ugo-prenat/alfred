import { PayloadContext } from '@stats-station/utils';
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
} from '@stats-station/models';
import {
  handleGetBroadcaster,
  makeTwitchFetcherParams
} from '../twitch/twitch.utils';
import {
  makeAPIBroadcasterToBroadcaster,
  makeRawBroadcaster
} from './broadcasters.utils';
import { logError } from '@/utils/logger.utils';
import { makeAPIBotToBot, makeDBBot } from '../bots/bots.utils';
import mongoose from 'mongoose';

export const createBroadcaster = (
  c: PayloadContext<ICreateBroadcasterPayload>
) => {
  const { twitchToken } = c.req.valid('json');

  const fetcherParams: ITwitchFetcherParams =
    makeTwitchFetcherParams(twitchToken);

  return handleGetBroadcaster(fetcherParams)
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
            .then((bot: IBot) =>
              c.json(
                { message: 'broadcaster and bot created', broadcaster, bot },
                201
              )
            )
            .catch((err: APIError) => c.json(logError(err), err.status));
        })
        .catch((err: APIError) => c.json(logError(err), err.status));
    })
    .catch((err: APIError) => c.json(logError(err), err.status));
};
