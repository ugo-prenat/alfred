import {
  Navigate,
  NotFoundRoute,
  Outlet,
  RootRoute,
  Route,
  redirect
} from '@tanstack/react-router';
import AdminBroadcastersPage from '@pages/admin/broadcasters/Broadcasters.page';
import AdminPage from '@pages/admin/Admin.page';
import FeaturesPage from '@pages/features/Features.page';
import Nav from '@components/nav/Nav';

const isAuthenticated = true;

export const rootRoute = new RootRoute({
  component: () => (
    <>
      <Nav />
      <hr />
      <Outlet />
    </>
  )
});

export const protectedRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'protected',
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href }
      });
    }
  }
});

export const homeRedirectRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Navigate to="/features" />
});

export const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => <p>Login</p>
});

export const featuresRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/features',
  component: FeaturesPage
});

// Admin
export const adminRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: 'admin'
});
export const adminIndexRoute = new Route({
  getParentRoute: () => adminRoute,
  path: '/',
  component: AdminPage
});
export const adminBroadcastersRoute = new Route({
  getParentRoute: () => adminRoute,
  path: '/broadcasters',
  component: AdminBroadcastersPage
});

// Not found
export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <h1>Page not found</h1>
});
