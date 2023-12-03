import { Hono } from 'hono';
import {
  getTwitchUser,
  getTwitchUserEventSubSubscriptions
} from './twitch.controllers';

const twitchRoute = new Hono();

twitchRoute.get('/users/:twitchAccessToken', getTwitchUser);
twitchRoute.get(
  '/users/:twitchAccessToken/eventsub/subscriptions',
  getTwitchUserEventSubSubscriptions
);

export default twitchRoute;
