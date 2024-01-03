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
import NavRoute from '@components/nav/NavRoute';
import OnboardingPage from '@pages/onboarding/Onboarding.page';
import BotPage from '@pages/bot/Bot.page';
import HisotryPage from '@pages/history/History.page';
import NoteFoundPage from '@pages/redirection/NotFound.page';
import ProtectedRoute from '@components/nav/ProtectedRoute';

export const rootRoute = new RootRoute();

export const navRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'nav',
  component: () => <NavRoute />
});

export const fullscreenRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'fullscreen',
  component: () => <Outlet />
});

export const protectedRoute = new Route({
  getParentRoute: () => navRoute,
  id: 'protected',
  component: () => <ProtectedRoute />
});

// Not found
export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <NoteFoundPage />
});

// Fullscreen
export const onboardingRoute = new Route({
  getParentRoute: () => fullscreenRoute,
  path: '/onboarding',
  component: () => <OnboardingPage />
});

// Protected
export const homeRedirectRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/',
  component: () => <Navigate to="/features" />
});

export const featuresRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/features',
  component: () => <FeaturesPage />
});

export const botRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/bot',
  component: () => <BotPage />
});

export const historyRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: '/history',
  component: () => <HisotryPage />
});

export const adminRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: 'admin'
});

export const adminIndexRoute = new Route({
  getParentRoute: () => adminRoute,
  path: '/',
  component: () => <AdminPage />
});

export const adminBroadcastersRoute = new Route({
  getParentRoute: () => adminRoute,
  path: '/broadcasters',
  component: () => <AdminBroadcastersPage />
});
