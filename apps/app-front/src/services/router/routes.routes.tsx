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
import NavRoute from '@components/nav/NavRoute';
import OnboardingPage from '@pages/onboarding/Onboarding.page';
import BotPage from '@pages/bot/Bot.page';
import HisotryPage from '@pages/history/History.page';
import NoteFoundPage from '@pages/redirection/NotFound.page';
import { checkUserHasRequiredRouteRole } from '@utils/roles.utils';
import { getAccessToken, getRefreshToken } from '@hooks/useTokens';
import UnauthorizedPage from '@pages/redirection/Unauthorized.page';

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
  beforeLoad: async ({ location }) => {
    const isAuth = !!(getAccessToken() && getRefreshToken());
    const userHasRequiredRole = checkUserHasRequiredRouteRole(
      location.pathname
    );

    if (!isAuth)
      throw redirect({
        to: '/onboarding',
        search: { redirect: location.href }
      });

    if (!userHasRequiredRole) throw redirect({ to: '/unauthorized' });
  }
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

export const unauthorizedRoute = new Route({
  getParentRoute: () => navRoute,
  path: '/unauthorized',
  component: () => <UnauthorizedPage />
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
