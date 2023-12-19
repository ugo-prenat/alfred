import { Hono } from 'hono';
import {
  getTwitchUser,
  getTwitchEventSubSubscriptions
} from './twitch.controllers';

const twitchRoute = new Hono();

twitchRoute.get('/broadcaster', getTwitchUser);
twitchRoute.get(
  '/broadcasters/eventsub/subscriptions',
  getTwitchEventSubSubscriptions
);

export default twitchRoute;
