import { Hono } from 'hono';
import { handleTwitchWebhook, twitchWebhookAuth } from './twitch.middleware';
import { createEventSubSubscription } from './twitch.eventsub';
import {
  handleGetBroadcasterFollowers,
  handleGetBroadcasterSubscribers
} from './twitch.broadcasters';

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

export default twitchRoute;
