import { ROLE_LEVELS } from '@alfred/constants';
import rolesRoutes, { RoleRoute } from '@services/router/roles.routes';
import { useAuthStore } from '@services/state/auth/auth.stores';

export const checkUserHasRequiredRouteRole = (pathname: string) => {
  const { broadcaster } = useAuthStore.getState();
  const requiredRouteRole: RoleRoute = getRequiredRouteRole(pathname);

  if (!broadcaster) return false;
  if (requiredRouteRole === '*') return true;

  const userRoleLevel = ROLE_LEVELS[broadcaster.role];
  const requiredRoleLevel = ROLE_LEVELS[requiredRouteRole];
  return userRoleLevel >= requiredRoleLevel;
};

const getRequiredRouteRole = (pathname: string): RoleRoute => {
  const route = Object.keys(rolesRoutes).find((pattern) =>
    new RegExp(pattern).test(pathname)
  );
  return route ? rolesRoutes[route] : 'owner';
};
