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
      broadcaster_user_id: '999410587'
    },
    transport: {
      method: 'webhook',
      callback: TWITCH_WEBHOOK_CALLBACK_URL,
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
