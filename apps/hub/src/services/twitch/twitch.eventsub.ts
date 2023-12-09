import {
  APIError,
  ChannelSubscribe,
  ITwitchEventsub,
  StreamOffline,
  StreamOnline
} from '@stats-station/models';
import { ITwitchFetcherParams, logError } from '@stats-station/utils';
import { Context } from 'hono';
import {
  makeEventSubRequestBody,
  makeTwitchFetcherParams
} from './twitch.utils';
import { createEventSubSubscriptions } from './twitch.api';

export const createEventSubSubscription = (c: Context) => {
  const fetcherParams: ITwitchFetcherParams = makeTwitchFetcherParams(
    process.env.TWITCH_APP_ACCESS_TOKEN
  );
  const payload = makeEventSubRequestBody({
    type: 'channel.subscribe',
    version: '1',
    condition: { broadcaster_user_id: '131122741' }
  });

  return createEventSubSubscriptions(fetcherParams, payload)
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};

export const handleChannelSubscribe = async (c: Context) => {
  const { event } = (await c.req.json()) as ITwitchEventsub<ChannelSubscribe>;
  return c.json({
    message: `${event.user_name} subscribed to ${event.broadcaster_user_name}`
  });
};

export const handleChannelOnline = async (c: Context) => {
  const { event } = (await c.req.json()) as ITwitchEventsub<StreamOnline>;
  return c.json({
    message: `${event.broadcaster_user_name} just went live`
  });
};

export const handleChannelOffline = async (c: Context) => {
  const { event } = (await c.req.json()) as ITwitchEventsub<StreamOffline>;
  return c.json({
    message: `${event.broadcaster_user_name} just went offline`
  });
};
