import {
  APIError,
  ITwitchBroadcaster,
  ITwitchFetcherParams
} from '@stats-station/models';
import { getBroadcaster } from './twitch.api';
import { TWITCH_API_URL, isEmpty } from '@stats-station/utils';

export const makeTwitchFetcherParams = (
  twitchAccessToken: string
): ITwitchFetcherParams => ({
  twitchAccessToken,
  twitchClientId: process.env.TWITCH_CLIENT_ID
});

export const handleGetBroadcaster = (
  fetcherParams: ITwitchFetcherParams
): Promise<ITwitchBroadcaster> =>
  getBroadcaster(fetcherParams)
    .then((res) => {
      if (isEmpty(res.data))
        throw new APIError('No broadcaster found', 404, {
          api: 'twitch',
          method: 'GET',
          url: `${TWITCH_API_URL}/users`
        });

      return res.data[0];
    })
    .catch((err: APIError) => Promise.reject(err));
