import { BroadcasterRole } from '@alfred/models';
import { Context, MiddlewareHandler, Next } from 'hono';
import { verify } from 'hono/jwt';
import { ITokenPayload, userHasRequiredRole } from './jwt.utils';

interface IAuthProps {
  requiredRole: BroadcasterRole;
  userCanPerformAction: boolean;
}

const auth =
  (
    { requiredRole, userCanPerformAction }: IAuthProps,
    secret: string
  ): MiddlewareHandler =>
  async (c: Context, next: Next) => {
    const headerToken = c.req.header('Authorization');
    const token = headerToken?.split(' ')[1];

    if (!headerToken || !token)
      return c.json({ error: 'No token provided' }, 401);

    return verify(token, secret)
      .then(async ({ role }: ITokenPayload) => {
        console.log({
          userRole: role,
          requiredRole,
          userHasRequiredRole: userHasRequiredRole(role, requiredRole),
          userCanPerformAction
        });

        if (!userHasRequiredRole(role, requiredRole) || !userCanPerformAction)
          return c.json(
            { error: "You don't have permission to call this endpoint" },
            403
          );
        await next();
      })
      .catch(() => c.json({ error: 'Invalid token' }, 401));
  };

const checkAuth = (secret: string) =>
  auth({ requiredRole: 'member', userCanPerformAction: true }, secret);

const requiredAuth =
  (secret: string) =>
  (
    requiredRole: BroadcasterRole,
    { userCanPerformAction = true }: { userCanPerformAction?: boolean } = {}
  ) =>
    auth({ requiredRole, userCanPerformAction }, secret);

export const createAuth = (secret: string) => ({
  checkAuth: checkAuth(secret),
  requiredAuth: requiredAuth(secret)
});
