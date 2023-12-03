import {
  TWITCH_EVENTSUB_HEADER_MESSAGE_TYPE,
  TWITCH_WEBHOOK_CALLBACK_URL
} from '@stats-station/constants';
import {
  APIError,
  IGetTwitchEventSubSubscriptionResponse,
  ITwitchEventSubSubscriptionCreation
} from '@stats-station/models';
import {
  ITwitchFetcherParams,
  twitchFetcher,
  logError
} from '@stats-station/utils';
import { Context } from 'hono';
import { makeTwitchFetcherParams } from './twitch.utils';

const TWITCH_MESSAGE_TYPE = TWITCH_EVENTSUB_HEADER_MESSAGE_TYPE.toLowerCase();

export const handleTwitchWebhook = (c: Context) => {
  const { headers } = c.req.raw;
  const messageType = headers.get(TWITCH_MESSAGE_TYPE);

  return c.json({ message: `twitch message type: ${messageType}` });
};

export const createEventSubSubscription = (c: Context) => {
  const fetcherParams: ITwitchFetcherParams = makeTwitchFetcherParams(
    process.env.TWITCH_APP_ACCESS_TOKEN
  );
  const payload: ITwitchEventSubSubscriptionCreation = {
    type: 'channel.subscribe',
    version: '1',
    condition: {
      broadcaster_user_id: '131122741'
    },
    transport: {
      method: 'webhook',
      callback:
        'https://4cc4-2a01-e0a-2be-a4f0-c47d-ddd3-760e-a9d3.ngrok-free.app/twitch/eventsub',
      secret: process.env.TWITCH_WEBHOOK_SECRET
    }
  };

  return twitchFetcher
    .post<IGetTwitchEventSubSubscriptionResponse>(
      '/eventsub/subscriptions',
      fetcherParams,
      { body: JSON.stringify(payload) }
    )
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};
