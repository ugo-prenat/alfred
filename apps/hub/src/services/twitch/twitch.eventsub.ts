import {
  APIError,
  ITwitchClip,
  ITwitchEventsub,
  ITwitchStream,
  StreamOffline,
  StreamOnline
} from '@alfred/models';
import { Context } from 'hono';
import {
  handleGetLastStream,
  handleGetMostViewedStreamClip,
  makeEventSubRequestBody
} from './twitch.utils';
import { createEventSubSubscriptions } from './twitch.api';
import {
  makeStreamOfflineTweetText,
  makeStreamOnlineTweetText
} from '../twitter/twitter.utils';
import { postTweet } from '../twitter/twitter.api';
import { logError } from '@/utils/logger.utils';

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

export const handleStreamOnline = async (c: Context) => {
  const { event } = (await c.req.json()) as ITwitchEventsub<StreamOnline>;
  const { broadcaster_user_id, broadcaster_user_name } = event;

  const maybeStream: ITwitchStream | null = await handleGetLastStream(
    broadcaster_user_id,
    broadcaster_user_name
  );

  const tweetText: string = makeStreamOnlineTweetText(event, maybeStream);
  return postTweet({ text: tweetText })
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};

export const handleStreamOffline = async (c: Context) => {
  const { event } = (await c.req.json()) as ITwitchEventsub<StreamOffline>;
  const { broadcaster_user_id, broadcaster_user_name } = event;

  const maybeClip: ITwitchClip | null = await handleGetMostViewedStreamClip(
    broadcaster_user_id,
    broadcaster_user_name
  );

  const tweetText: string = makeStreamOfflineTweetText(event, maybeClip);
  return postTweet({ text: tweetText })
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};
