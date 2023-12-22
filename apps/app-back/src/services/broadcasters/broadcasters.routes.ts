import { Hono } from 'hono';
import { createBrodcasterSchema } from './broadcasters.models';
import {
  createBroadcaster,
  getBroadcaster,
  getBroadcasters
} from './broadcasters.controllers';
import { payloadValidator } from '@/utils/validator.utils';

const broadcastersRoute = new Hono();

broadcastersRoute.get('/', getBroadcasters);
broadcastersRoute.get('/:broadcasterId', getBroadcaster);
broadcastersRoute.post(
  '/',
  payloadValidator(createBrodcasterSchema),
  createBroadcaster
);

export default broadcastersRoute;
