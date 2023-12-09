import { TWITCH_EVENTSUB_HEADER_SUBSCRIPTION_TYPE } from '@stats-station/constants';
import {
  APIError,
  ChannelSubscribe,
  IGetTwitchEventSubSubscriptionResponse,
  ITwitchEventSubSubscriptionCreation,
  ITwitchEventsub
} from '@stats-station/models';
import {
  ITwitchFetcherParams,
  twitchFetcher,
  logError
} from '@stats-station/utils';
import { Context } from 'hono';
import { makeTwitchFetcherParams } from './twitch.utils';
import { get } from 'http';
import {
  getBroadcasterFollowersTotal,
  getBroadcasterSubscribersTotal,
  getEventSubSubscriptions
} from './twitch.api';

const TWITCH_SUBSCRIPTION_TYPE =
  TWITCH_EVENTSUB_HEADER_SUBSCRIPTION_TYPE.toLowerCase();

export const handleTwitchWebhook = async (c: Context) => {
  const { headers } = c.req.raw;
  const body = await c.req.json();
  const subscriptionType = headers.get(TWITCH_SUBSCRIPTION_TYPE);

  switch (subscriptionType) {
    case 'channel.subscribe': {
      const { event } = body as ITwitchEventsub<ChannelSubscribe>;
      return c.json({
        message: `${event.user_name} subscribed to ${event.broadcaster_user_name}`
      });
    }

    case undefined:
      return c.json({ message: 'no subscription type given' }, 400);
    default:
      return c.json(
        { message: `subscription type '${subscriptionType}' not supported` },
        400
      );
  }
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
        'https://429e-2a01-e0a-2be-a4f0-d57c-2d8e-64e7-6ced.ngrok-free.app/twitch/eventsub',
      secret: process.env.TWITCH_WEBHOOK_SECRET
    }
  };

  return getEventSubSubscriptions(fetcherParams, payload)
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};

export const handleGetBroadcasterSubscribers = (c: Context) => {
  const broadcasterId = c.req.param('broadcasterId');
  const fetcherParams: ITwitchFetcherParams = makeTwitchFetcherParams(
    process.env.TWITCH_APP_ACCESS_TOKEN
  );

  return getBroadcasterSubscribersTotal(broadcasterId, fetcherParams)
    .then((total) => c.json({ totalSubscriber: total }))
    .catch((err: APIError) => c.json(logError(err), err.status));
};

export const handleGetBroadcasterFollowers = (c: Context) => {
  const broadcasterId = c.req.param('broadcasterId');
  const fetcherParams: ITwitchFetcherParams = makeTwitchFetcherParams(
    process.env.TWITCH_APP_ACCESS_TOKEN
  );

  return getBroadcasterFollowersTotal(broadcasterId, fetcherParams)
    .then((total) => c.json({ totalFollower: total }))
    .catch((err: APIError) => c.json(logError(err), err.status));
};
