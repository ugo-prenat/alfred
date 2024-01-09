import { Hono } from 'hono';
import { refreshTokenSchema, loginPayloadSchema } from './broadcasters.models';
import {
  authBroadcaster,
  getBroadcaster,
  getBroadcasterFeatures,
  getBroadcasters,
  loginBroadcaster,
  refreshToken
} from './broadcasters.controllers';
import { payloadValidator } from '@/utils/validator.utils';
import { makeAccessTokens } from './broadcasters.utils';
import { basicAuth } from '@/utils/auth.utils';

const broadcastersRoute = new Hono();

broadcastersRoute.post(
  '/token/refresh',
  payloadValidator(refreshTokenSchema),
  refreshToken
);
broadcastersRoute.get('/auth/gettoken', (c) =>
  makeAccessTokens('6586fb58511d26755fc6e323', 'member')
    .then((tokens) => c.json(tokens))
    .catch((err) => c.json({ error: err.message }, 500))
);

broadcastersRoute.get('/auth', basicAuth, authBroadcaster);

broadcastersRoute.get('/', getBroadcasters);
broadcastersRoute.get('/:broadcasterId', getBroadcaster);

broadcastersRoute.post(
  '/login',
  payloadValidator(loginPayloadSchema),
  loginBroadcaster
);

broadcastersRoute.get('/:broadcasterId/features', getBroadcasterFeatures);

export default broadcastersRoute;
