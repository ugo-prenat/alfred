import { PayloadContext } from '@stats-station/utils';
import { ICreateBroadcasterPayload } from './broadcasters.models';
import {
  APIError,
  IRawBroadcaster,
  ITwitchFetcherParams
} from '@stats-station/models';
import {
  handleGetBroadcaster,
  makeTwitchFetcherParams
} from '../twitch/twitch.utils';
import { makeRawBroadcaster } from './broadcasters.utils';
import { logError } from '@/utils/logger.utils';

export const createBroadcaster = (
  c: PayloadContext<ICreateBroadcasterPayload>
) => {
  const { twitchToken } = c.req.valid('json');

  const fetcherParams: ITwitchFetcherParams =
    makeTwitchFetcherParams(twitchToken);

  return handleGetBroadcaster(fetcherParams)
    .then((twitchBroadcaster) => {
      const newBroadcaster: IRawBroadcaster = makeRawBroadcaster(
        twitchBroadcaster,
        twitchToken
      );

      // 1. create new bot
      // 2. save newBroadcaster in DB
      // 3. save newBot in DB

      return c.json(newBroadcaster, 201);
    })
    .catch((err: APIError) => c.json(logError(err), err.status));
};
