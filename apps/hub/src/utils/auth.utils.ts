import { createAuthMiddlewares } from '@alfred/utils';

export const { basicAuth, checkAuthByBroadcasterId, restrictedRoute } =
  createAuthMiddlewares(process.env.JWT_SECRET);
