import { Hono } from 'hono';
import { createBrodcasterSchema } from './broadcasters.models';
import {
  createBroadcaster,
  getBroadcaster,
  getBroadcasters
} from './broadcasters.controllers';
import { payloadValidator } from '@/utils/validator.utils';
import { checkAuth, requiredAuth } from '@/utils/auth.utils';
import { signJwt } from '@alfred/utils';

const broadcastersRoute = new Hono();

broadcastersRoute.get('/auth/gettoken', (c) => {
  return signJwt({ role: 'admin', sub: 'user id' }, process.env.JWT_SECRET)
    .then((token) => c.json({ token }))
    .catch((err) => c.json({ err }, 500));
});
broadcastersRoute.get('/auth/normal', checkAuth, (c) =>
  c.json({ message: 'ok' })
);
broadcastersRoute.get('/auth/admin', requiredAuth('admin'), (c) =>
  c.json({ message: 'ok' })
);

broadcastersRoute.get('/', getBroadcasters);
broadcastersRoute.get('/:broadcasterId', getBroadcaster);
broadcastersRoute.post(
  '/',
  payloadValidator(createBrodcasterSchema),
  createBroadcaster
);

export default broadcastersRoute;
