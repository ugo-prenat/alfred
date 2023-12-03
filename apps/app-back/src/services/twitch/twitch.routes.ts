import { Hono } from 'hono';
import {
  getTwitchUser,
  getTwitchEventSubSubscriptions
} from './twitch.controllers';

const twitchRoute = new Hono();

twitchRoute.get('/users/:twitchAccessToken', getTwitchUser);
twitchRoute.get(
  '/users/eventsub/subscriptions',
  getTwitchEventSubSubscriptions
);

export default twitchRoute;
