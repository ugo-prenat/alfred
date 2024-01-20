import {
  APIError,
  ITwitchBroadcaster,
  ITwitchEventSubSubscriptionCreation,
  ITwitchFetcherParams
} from '@alfred/models';
import { createEventSubSubscriptions, getBroadcaster } from './twitch.api';
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

export const subscribeEventSub = async ({
  type,
  version,
  condition
}: Omit<ITwitchEventSubSubscriptionCreation, 'transport'>) => {
  const payload = makeEventSubRequestBody({ type, version, condition });
  const response = await createEventSubSubscriptions(payload);

  if (isEmpty(response.data))
    throw new Error('eventsub subscription failed, no data found in response');

  return response.data[0];
};

export const makeEventSubRequestBody = (
  props: Omit<ITwitchEventSubSubscriptionCreation, 'transport'>
): ITwitchEventSubSubscriptionCreation => ({
  ...props,
  transport: {
    method: 'webhook',
    callback: `${process.env.HUB_URL}/twitch/eventsub`,
    secret: process.env.TWITCH_WEBHOOK_SECRET
  }
});
