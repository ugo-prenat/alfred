import { Hono } from 'hono';
import { getTwitchEventSubSubscriptions } from './twitch.controllers';

const twitchRoute = new Hono();

twitchRoute.get('/eventsub/subscriptions', getTwitchEventSubSubscriptions);

export default twitchRoute;
