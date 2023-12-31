import {
  APIError,
  ITwitchBroadcaster,
  ITwitchFetcherParams
} from '@alfred/models';
import { getBroadcaster } from './twitch.api';
import { TWITCH_API_URL, isEmpty } from '@alfred/utils';

export const makeTwitchFetcherParams = (
  twitchAccessToken: string
): ITwitchFetcherParams => ({
  twitchAccessToken,
  twitchClientId: process.env.TWITCH_CLIENT_ID
});

export const handleGetTwitchBroadcaster = (
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

      const broadcaster: ITwitchBroadcaster = res.data[0];
      return {
        ...broadcaster,
        broadcaster_type: isEmpty(broadcaster.broadcaster_type)
          ? 'normal'
          : broadcaster.broadcaster_type
      };
    })
    .catch((err: APIError) => Promise.reject(err));
