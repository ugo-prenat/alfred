import { Hono } from 'hono';
import { createBrodcasterSchema } from './broadcasters.models';
import { createBroadcaster } from './broadcasters.controllers';
import { payloadValidator } from '@/utils/validator.utils';

const broadcastersRoute = new Hono();

broadcastersRoute.post(
  '/',
  payloadValidator(createBrodcasterSchema),
  createBroadcaster
);

export default broadcastersRoute;
