import { payloadValidator } from '@stats-station/utils';
import { Hono } from 'hono';
import { createBrodcasterSchema } from './broadcasters.models';
import { createBroadcaster } from './broadcasters.controllers';

const broadcastersRoute = new Hono();

broadcastersRoute.post(
  '/',
  payloadValidator(createBrodcasterSchema),
  createBroadcaster
);

export default broadcastersRoute;
