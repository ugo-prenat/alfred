import { Hono } from 'hono';
import { handleTwitchWebhook, twitchWebhookAuth } from './twitch.middleware';
import { createEventSubSubscription } from './twitch.eventsub';
import {
  handleGetBroadcasterFollowers,
  handleGetBroadcasterSubscribers
} from './twitch.broadcasters';
import { basicAuth } from '@/utils/auth.utils';

const twitchRoute = new Hono();
twitchRoute.use('/broadcasters/*', basicAuth);

twitchRoute.post('/eventsub', twitchWebhookAuth, handleTwitchWebhook);
twitchRoute.post('/eventsub/subscriptions', createEventSubSubscription);

twitchRoute.get(
  '/broadcasters/:broadcasterId/subscribers',
  handleGetBroadcasterSubscribers
);
twitchRoute.get(
  '/broadcasters/:broadcasterId/followers',
  handleGetBroadcasterFollowers
);

export default twitchRoute;
