import { Hono } from 'hono';
import {
  createBrodcasterSchema,
  refreshTokenSchema
} from './broadcasters.models';
import {
  createBroadcaster,
  getBroadcaster,
  getBroadcasters,
  refreshToken
} from './broadcasters.controllers';
import { payloadValidator } from '@/utils/validator.utils';
import { makeAccessTokens } from './broadcasters.utils';

const broadcastersRoute = new Hono();

broadcastersRoute.post(
  '/token/refresh',
  payloadValidator(refreshTokenSchema),
  refreshToken
);
broadcastersRoute.get('/auth/gettoken', (c) =>
  makeAccessTokens('uprenat', 'member')
    .then((tokens) => c.json(tokens))
    .catch((err) => c.json({ error: err.message }, 500))
);

broadcastersRoute.get('/', getBroadcasters);
broadcastersRoute.get('/:broadcasterId', getBroadcaster);
broadcastersRoute.post(
  '/',
  payloadValidator(createBrodcasterSchema),
  createBroadcaster
);

export default broadcastersRoute;
