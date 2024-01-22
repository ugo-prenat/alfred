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
import {
  basicAuth,
  checkAuthByBroadcasterId,
  restrictedRoute
} from '@/utils/auth.utils';
import { updateFeaturePayloadSchema } from '../features/features.models';
import { checkIfFeatureCanBeUpdated } from './broadcasters.middlewares';

const broadcastersRoute = new Hono();

broadcastersRoute.post(
  '/token/refresh',
  payloadValidator(refreshTokenSchema),
  refreshToken
);
broadcastersRoute.get('/auth/gettoken', (c) =>
  makeAccessTokens('6586fb58511d26755fc6e323', 'admin')
    .then((tokens) => c.json(tokens))
    .catch((err) => c.json({ error: err.message }, 500))
);

broadcastersRoute.get('/auth', basicAuth, authBroadcaster);

broadcastersRoute.get(
  '/',
  basicAuth,
  restrictedRoute('moderator'),
  getBroadcasters
);
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

export const UPDATE_BROADCASTER_FEATURE_PATH =
  '/:broadcasterId/features/:featureName';
broadcastersRoute.put(
  UPDATE_BROADCASTER_FEATURE_PATH,
  basicAuth,
  checkAuthByBroadcasterId('moderator'),
  payloadValidator(updateFeaturePayloadSchema),
  checkIfFeatureCanBeUpdated(),
  updateBroadcasterFeature
);

export default broadcastersRoute;
