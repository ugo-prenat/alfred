import {
  Navigate,
  NotFoundRoute,
  RootRoute,
  Route,
  redirect
} from '@tanstack/react-router';
import AdminBroadcastersPage from '@pages/admin/broadcasters/Broadcasters.page';
import AdminPage from '@pages/admin/Admin.page';
import FeaturesPage from '@pages/features/Features.page';
import Root from '@components/nav/Root';
import OnboardingPage from '@pages/onboarding/Onboarding.page';
import BotPage from '@pages/bot/Bot.page';
import HisotryPage from '@pages/history/History.page';

const isAuthenticated = true;

export const rootRoute = new RootRoute({
  component: () => <Root />
});

const protectedRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'protected',
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated) {
      throw redirect({
        to: '/onboarding',
        search: { redirect: location.href }
      });
    }
  }
});

// Not found
export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <h1>Page not found</h1>
});

const homeRedirectRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Navigate to="/features" />
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/onboarding',
  component: () => <OnboardingPage />
});

const featuresRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/features',
  component: () => <FeaturesPage />
});

const adminRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: 'admin'
});
const adminIndexRoute = new Route({
  getParentRoute: () => adminRoute,
  path: '/',
  component: () => <AdminPage />
});
const adminBroadcastersRoute = new Route({
  getParentRoute: () => adminRoute,
  path: '/broadcasters',
  component: () => <AdminBroadcastersPage />
});

const botRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/bot',
  component: () => <BotPage />
});

const historyRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/history',
  component: () => <HisotryPage />
});

export const routes = [
  botRoute,
  loginRoute,
  historyRoute,
  featuresRoute,
  protectedRoute,
  homeRedirectRoute,
  adminRoute.addChildren([adminIndexRoute, adminBroadcastersRoute])
];
