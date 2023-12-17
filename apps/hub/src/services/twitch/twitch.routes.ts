import { Context, Hono } from 'hono';
import { handleTwitchWebhook, twitchWebhookAuth } from './twitch.middleware';
import { createEventSubSubscription } from './twitch.eventsub';
import {
  handleGetBroadcasterFollowers,
  handleGetBroadcasterSubscribers
} from './twitch.broadcasters';
import { logger } from '@stats-station/utils';

const twitchRoute = new Hono();

twitchRoute.post('/eventsub', twitchWebhookAuth, handleTwitchWebhook);
twitchRoute.post('/eventsub/subscriptions', createEventSubSubscription);

twitchRoute.get(
  '/broadcaster/:broadcasterId/subscribers',
  handleGetBroadcasterSubscribers
);
twitchRoute.get(
  '/broadcaster/:broadcasterId/followers',
  handleGetBroadcasterFollowers
);

twitchRoute.get('/', (c: Context) => {
  logger.warn({ foo: Math.random() }, 'Hello Twitch!');
  return c.json({ message: 'Hello Twitch!' });
});

export default twitchRoute;
