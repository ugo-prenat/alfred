import { Hono } from 'hono';
import {
  createTwitchBroadcaster,
  getTwitchBroadcaster,
  getTwitchEventSubSubscriptions
} from './twitch.controllers';
import { payloadValidator } from '@stats-station/utils';
import { createBrodcasterSchema } from './twitch.models';

const twitchRoute = new Hono();

twitchRoute.get('/broadcasters', getTwitchBroadcaster);
twitchRoute.post(
  '/broadcasters',
  payloadValidator(createBrodcasterSchema),
  createTwitchBroadcaster
);
twitchRoute.get(
  '/broadcasters/eventsub/subscriptions',
  getTwitchEventSubSubscriptions
);

export default twitchRoute;
