import { Router } from '@tanstack/react-router';
import {
  adminBroadcastersRoute,
  adminIndexRoute,
  adminRoute,
  featuresRoute,
  homeRedirectRoute,
  loginRoute,
  notFoundRoute,
  protectedRoute,
  rootRoute
} from './routes.routes';

const routeTree = rootRoute.addChildren([
  loginRoute,
  featuresRoute,
  protectedRoute,
  homeRedirectRoute,
  adminRoute.addChildren([adminIndexRoute, adminBroadcastersRoute])
]);

export const router = new Router({ routeTree, notFoundRoute });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
