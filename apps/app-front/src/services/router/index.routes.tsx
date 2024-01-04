import { Router } from '@tanstack/react-router';
import {
  adminBroadcastersRoute,
  adminIndexRoute,
  adminRoute,
  botRoute,
  featuresRoute,
  fullscreenRoute,
  navRoute,
  historyRoute,
  homeRedirectRoute,
  onboardingRoute,
  notFoundRoute,
  protectedRoute,
  rootRoute,
  unauthorizedRoute
} from './routes.routes';

const routeTree = rootRoute.addChildren([
  navRoute.addChildren([
    unauthorizedRoute,
    protectedRoute.addChildren([
      homeRedirectRoute,
      featuresRoute,
      botRoute,
      historyRoute,
      adminRoute.addChildren([adminIndexRoute, adminBroadcastersRoute])
    ])
  ]),
  fullscreenRoute.addChildren([onboardingRoute])
]);

export const router = new Router({ routeTree, notFoundRoute });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
