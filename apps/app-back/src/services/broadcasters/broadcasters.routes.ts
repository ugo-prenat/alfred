import { Hono } from 'hono';
import { twitchTokenSchema, refreshTokenSchema } from './broadcasters.models';
import {
  authBroadcaster,
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
  makeAccessTokens('6586fb58511d26755fc6e323', 'member')
    .then((tokens) => c.json(tokens))
    .catch((err) => c.json({ error: err.message }, 500))
);

broadcastersRoute.get('/', getBroadcasters);
broadcastersRoute.get('/:broadcasterId', getBroadcaster);
// broadcastersRoute.post(
//   '/',
//   payloadValidator(twitchTokenSchema),
//   createBroadcaster
// );
broadcastersRoute.post(
  '/auth',
  payloadValidator(twitchTokenSchema),
  authBroadcaster
);

export default broadcastersRoute;
