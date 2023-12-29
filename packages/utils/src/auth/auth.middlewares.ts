import { Context, MiddlewareHandler, Next } from 'hono';
import { verify } from 'hono/jwt';
import { JWT_ALGORITHM, JWT_TOKEN_EXPIRED_ERROR } from '@alfred/constants';
import { IJwtPayload } from './auth.models';
import { userCanPerformAction, userHasRequiredRole } from './auth.utils';
import { BroadcasterRole } from '@alfred/models';

const basicAuth =
  (secret: string): MiddlewareHandler =>
  async (c: Context, next: Next) => {
    const headerToken = c.req.header('Authorization');
    const token = headerToken?.split(' ')[1];

    if (!headerToken || !token)
      return c.json({ error: 'No token provided' }, 401);

    return verify(token, secret, JWT_ALGORITHM)
      .then(async (jwt: IJwtPayload) => {
        c.set('jwt', jwt);
        await next();
      })
      .catch((err) => {
        return c.json(
          {
            error:
              err.name === JWT_TOKEN_EXPIRED_ERROR ? err.name : 'Invalid token'
          },
          401
        );
      });
  };

const checkAuthByBroadcasterId =
  (requiredRole: BroadcasterRole): MiddlewareHandler =>
  async (c: Context, next: Next) => {
    const jwt: IJwtPayload = c.get('jwt');
    const broadcasterId = c.req.param('broadcasterId');

    if (!userCanPerformAction(jwt, broadcasterId, requiredRole))
      return c.json(
        {
          error: "You don't have permission to call this endpoint",
          code: 'AUMI-1'
        },
        403
      );

    await next();
  };

const restrictedRoute =
  (requiredRole: BroadcasterRole): MiddlewareHandler =>
  async (c: Context, next: Next) => {
    const jwt: IJwtPayload = c.get('jwt');

    if (!userHasRequiredRole(jwt.role, requiredRole))
      return c.json(
        {
          error: "You don't have permission to call this endpoint",
          code: 'AUMI-2'
        },
        403
      );

    await next();
  };

export const createAuthMiddlewares = (secret: string) => ({
  basicAuth: basicAuth(secret),
  checkAuthByBroadcasterId,
  restrictedRoute
});
