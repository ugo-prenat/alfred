import { Hono } from 'hono';
import {
  createEventSubSubscription,
  handleTwitchWebhook
} from './twitch.controllers';
import { twitchWebhookAuth } from './twitch.middleware';

const twitchRoute = new Hono();

twitchRoute.post('/eventsub', twitchWebhookAuth, handleTwitchWebhook);
twitchRoute.post('/eventsub/subscriptions', createEventSubSubscription);

export default twitchRoute;
