import { Router } from '@tanstack/react-router';
import { notFoundRoute, rootRoute, routes } from './routes.routes';

const routeTree = rootRoute.addChildren(routes);
export const router = new Router({ routeTree, notFoundRoute });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
