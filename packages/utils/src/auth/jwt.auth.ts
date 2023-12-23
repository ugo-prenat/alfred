import { BroadcasterRole } from '@alfred/models';
import { Context, MiddlewareHandler, Next } from 'hono';
import { verify } from 'hono/jwt';
import { ITokenPayload, userHasRequiredRole } from './jwt.utils';

const auth =
  (requiredRole: BroadcasterRole, secret: string): MiddlewareHandler =>
  async (c: Context, next: Next) => {
    const headerToken = c.req.header('Authorization');
    const token = headerToken?.split(' ')[1];

    const broadcasterId = c.req.param('broadcasterId');

    if (!headerToken || !token)
      return c.json({ error: 'No token provided' }, 401);

    return verify(token, secret)
      .then(async ({ role, sub }: ITokenPayload) => {
        const userCanPerformAction = broadcasterId === sub;

        if (!userHasRequiredRole(role, requiredRole) && !userCanPerformAction)
          return c.json(
            { error: "You don't have permission to call this endpoint" },
            403
          );
        await next();
      })
      .catch(() => c.json({ error: 'Invalid token' }, 401));
  };

const checkAuth = (secret: string) => auth('member', secret);

const requiredAuth = (secret: string) => (requiredRole: BroadcasterRole) =>
  auth(requiredRole, secret);

export const createAuth = (secret: string) => ({
  checkAuth: checkAuth(secret),
  requiredAuth: requiredAuth(secret)
});
