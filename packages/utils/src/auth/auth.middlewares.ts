import { Context, MiddlewareHandler, Next } from 'hono';
import { verify } from 'hono/jwt';
import { JWT_ALGORITHM, JWT_TOKEN_EXPIRED_ERROR } from '@alfred/constants';
import { IJwtPayload } from './auth.models';

export const authMiddleware =
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
