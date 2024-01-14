import { Hono } from 'hono';
import { refreshTokenSchema, loginPayloadSchema } from './broadcasters.models';
import {
  authBroadcaster,
  getBroadcaster,
  getBroadcasterFeatures,
  getBroadcasters,
  loginBroadcaster,
  refreshToken,
  updateBroadcasterFeature
} from './broadcasters.controllers';
import { payloadValidator } from '@/utils/validator.utils';
import { makeAccessTokens } from './broadcasters.utils';
import { basicAuth, checkAuthByBroadcasterId } from '@/utils/auth.utils';
import { updateFeaturePayloadSchema } from '../features/features.models';

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

broadcastersRoute.get(
  '/:broadcasterId/features',
  basicAuth,
  checkAuthByBroadcasterId('moderator'),
  getBroadcasterFeatures
);

broadcastersRoute.put(
  '/:broadcasterId/features/:featureName',
  basicAuth,
  checkAuthByBroadcasterId('moderator'),
  payloadValidator(updateFeaturePayloadSchema),
  updateBroadcasterFeature
);

export default broadcastersRoute;
