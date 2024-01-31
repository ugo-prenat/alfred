import {
  APIError,
  EventSubType,
  ITwitchClip,
  ITwitchEventsub,
  ITwitchStream,
  StreamOffline,
  StreamOnline
} from '@alfred/models';
import { Context } from 'hono';
import {
  ensureEventSubIsEnabled,
  handleGetLastStream,
  handleGetMostViewedStreamClip,
  makeEventSubRequestBody
} from './twitch.utils';
import { createEventSubSubscriptions } from './twitch.api';
import {
  createTweet,
  makeStreamOfflineTweetText,
  makeStreamOnlineTweetText
} from '../twitter/twitter.utils';
import { logError } from '@/utils/logger.utils';
import { ensureError } from '@alfred/utils';
import { IChannelGoalEnd } from '@alfred/models';
import {
  getBroadcaster,
  makeAPIBroadcasterToBroadcaster
} from '../broadcasters/broadcasters.utils';

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

export const handleStreamOnline = async (
  eventSubType: EventSubType,
  c: Context
) => {
  const { event } = (await c.req.json()) as ITwitchEventsub<StreamOnline>;
  const { broadcaster_user_id, broadcaster_user_name } = event;

  try {
    const isEventSubEnabled = await ensureEventSubIsEnabled({
      type: eventSubType,
      twitchId: broadcaster_user_id
    });

    if (!isEventSubEnabled)
      return c.json({
        message: 'feature disabled by the broadcaster',
        code: 'TWEV-1'
      });

    const broadcaster = await getBroadcaster({
      twitchId: broadcaster_user_id
    }).then(makeAPIBroadcasterToBroadcaster);

    const maybeStream: ITwitchStream | null = await handleGetLastStream(
      broadcaster_user_id,
      broadcaster_user_name
    );

    const tweetText: string = makeStreamOnlineTweetText(event, maybeStream);
    const tweet = await createTweet(
      { text: tweetText },
      broadcaster.id,
      broadcaster.botId.toString(),
      'stream-up'
    );

    return c.json(tweet);
  } catch (err) {
    if (err instanceof APIError) return c.json(logError(err), err.status);
    return c.json(logError(ensureError(err)), 500);
  }
};

export const handleStreamOffline = async (
  eventSubType: EventSubType,
  c: Context
) => {
  const { event } = (await c.req.json()) as ITwitchEventsub<StreamOffline>;
  const { broadcaster_user_id, broadcaster_user_name } = event;

  try {
    const isEventSubEnabled = await ensureEventSubIsEnabled({
      type: eventSubType,
      twitchId: broadcaster_user_id
    });

    if (!isEventSubEnabled)
      return c.json({
        message: 'feature disabled by the broadcaster',
        code: 'TWEV-2'
      });

    const broadcaster = await getBroadcaster({
      twitchId: broadcaster_user_id
    }).then(makeAPIBroadcasterToBroadcaster);

    const maybeClip: ITwitchClip | null = await handleGetMostViewedStreamClip(
      broadcaster_user_id,
      broadcaster_user_name
    );

    const tweetText: string = makeStreamOfflineTweetText(event, maybeClip);
    const tweet = await createTweet(
      { text: tweetText },
      broadcaster.id,
      broadcaster.botId.toString(),
      'stream-down'
    );

    return c.json(tweet);
  } catch (err) {
    if (err instanceof APIError) return c.json(logError(err), err.status);
    return c.json(logError(ensureError(err)), 500);
  }
};

export const handleChannelGoalEnd = async (
  eventSubType: EventSubType,
  c: Context
) => {
  const { event } = (await c.req.json()) as ITwitchEventsub<IChannelGoalEnd>;
  const { type, broadcaster_user_id } = event;

  try {
    const isEventSubEnabled = await ensureEventSubIsEnabled({
      type: eventSubType,
      subType: type,
      twitchId: broadcaster_user_id
    });

    if (!isEventSubEnabled)
      return c.json({
        message: 'feature disabled by the broadcaster',
        code: 'TWEV-3'
      });

    const broadcaster = await getBroadcaster({
      twitchId: broadcaster_user_id
    }).then(makeAPIBroadcasterToBroadcaster);

    const tweet = await createTweet(
      { text: `a new ${type} goal has been reached !` },
      broadcaster.id,
      broadcaster.botId.toString(),
      type === 'follower' ? 'followers-goal-end' : 'subscribers-goal-end'
    );

    return c.json(tweet);
  } catch (err) {
    if (err instanceof APIError) return c.json(logError(err), err.status);
    return c.json(logError(ensureError(err)), 500);
  }
};
