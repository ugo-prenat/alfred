import {
  Navigate,
  NotFoundRoute,
  Outlet,
  RootRoute,
  Route
} from '@tanstack/react-router';
import AdminBroadcastersPage from '@pages/admin/broadcasters/Broadcasters.page';
import AdminPage from '@pages/admin/Admin.page';
import FeaturesPage from '@pages/features/Features.page';
import Root from '@components/nav/Root';
import OnboardingPage from '@pages/onboarding/Onboarding.page';
import BotPage from '@pages/bot/Bot.page';
import HisotryPage from '@pages/history/History.page';
import { isAuthenticated } from '@services/state/auth/auth.utils';
import NoteFoundPage from '@pages/redirection/NotFound.page';
import UnauthorizedPage from '@pages/redirection/Unauthorized.page';

export const rootRoute = new RootRoute({
  component: () => <Root />
});

const protectedRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: () => (isAuthenticated() ? <Outlet /> : <UnauthorizedPage />)
});

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <NoteFoundPage />
});

const homeRedirectRoute = new Route({
  getParentRoute: () => protectedRoute,
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
