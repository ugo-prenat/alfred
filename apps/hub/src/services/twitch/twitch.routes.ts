import { Hono } from 'hono';
import {
  createEventSubSubscription,
  handleGetBroadcasterFollowers,
  handleGetBroadcasterSubscribers,
  handleTwitchWebhook
} from './twitch.controllers';
import { twitchWebhookAuth } from './twitch.middleware';

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
