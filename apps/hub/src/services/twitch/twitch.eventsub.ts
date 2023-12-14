import {
  APIError,
  ChannelSubscribe,
  ITwitchEventsub,
  ITwitchFetcherParams,
  ITwitterOAuthOptions,
  StreamOffline,
  StreamOnline
} from '@stats-station/models';
import { logError } from '@stats-station/utils';
import { Context } from 'hono';
import {
  makeEventSubRequestBody,
  makeTwitchFetcherParams
} from './twitch.utils';
import { createEventSubSubscriptions, getStream } from './twitch.api';
import { makeChannelOnlineTweetText } from '../twitter/twitter.utils';
import { createTweet } from '../twitter/twitter.api';

export const createEventSubSubscription = (c: Context) => {
  const payload = makeEventSubRequestBody({
    type: 'channel.subscribe',
    version: '1',
    condition: { broadcaster_user_id: '131122741' }
  });

  return createEventSubSubscriptions(payload)
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

  return getStream({ broadcasterId: event.broadcaster_user_id, type: 'live' })
    .then((res) => {
      const tweetText: string = makeChannelOnlineTweetText(event, res.data[0]);
      return createTweet({ text: tweetText })
        .then((res) => c.json(res))
        .catch((err: APIError) => c.json(logError(err), err.status));
    })
    .catch((err: APIError) => {
      logError(err);

      const tweetText: string = makeChannelOnlineTweetText(event);
      return createTweet({ text: tweetText })
        .then((res) => c.json(res))
        .catch((err: APIError) => c.json(logError(err), err.status));
    });
};

export const handleChannelOffline = async (c: Context) => {
  const { event } = (await c.req.json()) as ITwitchEventsub<StreamOffline>;
  return c.json({
    message: `${event.broadcaster_user_name} just went offline`
  });
};
