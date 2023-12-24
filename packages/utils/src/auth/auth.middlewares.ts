import { BroadcasterRole } from '@alfred/models';
import { Context, MiddlewareHandler, Next } from 'hono';
import { verify } from 'hono/jwt';
import { userHasRequiredRole } from './auth.utils';
import { JWT_ALGORITHM, JWT_TOKEN_EXPIRED_ERROR } from '@alfred/constants';
import { IJwtPayload } from './auth.models';

const auth =
  (requiredRole: BroadcasterRole, secret: string): MiddlewareHandler =>
  async (c: Context, next: Next) => {
    const headerToken = c.req.header('Authorization');
    const token = headerToken?.split(' ')[1];

    const broadcasterId = c.req.param('broadcasterId');

    if (!headerToken || !token)
      return c.json({ error: 'No token provided' }, 401);

    return verify(token, secret, JWT_ALGORITHM)
      .then(async (jwt: IJwtPayload) => {
        const userCanPerformAction = broadcasterId === jwt.sub;

        if (
          !userHasRequiredRole(jwt.role, requiredRole) &&
          !userCanPerformAction
        )
          return c.json(
            { error: "You don't have permission to call this endpoint" },
            403
          );

        c.set('jwtPayload', jwt);
        await next();
      })
      .catch((err) =>
        c.json(
          {
            error:
              err.name === JWT_TOKEN_EXPIRED_ERROR ? err.name : 'Invalid token'
          },
          401
        )
      );
  };

const checkAuth = (secret: string) => auth('member', secret);

const requiredAuth = (secret: string) => (requiredRole: BroadcasterRole) =>
  auth(requiredRole, secret);

export const createAuth = (secret: string) => ({
  checkAuth: checkAuth(secret),
  requiredAuth: requiredAuth(secret)
});
