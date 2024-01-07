import { ROLE_LEVELS } from '@alfred/constants';
import { BroadcasterRole } from '@alfred/models';
import rolesRoutes, { RoleRoute } from '@services/router/roles.routes';
import { useAuthStore } from '@services/state/auth/auth.stores';

export const checkUserHasRequiredRouteRole = (pathname: string) => {
  const { broadcaster } = useAuthStore.getState();
  const requiredRouteRole: RoleRoute = getRequiredRouteRole(pathname);

  if (!broadcaster) return false;
  if (requiredRouteRole === '*') return true;

  return userHasRequiredRole(broadcaster.role, requiredRouteRole);
};

const getRequiredRouteRole = (pathname: string): RoleRoute => {
  const route = Object.keys(rolesRoutes).find((pattern) =>
    new RegExp(pattern).test(pathname)
  );
  return route ? rolesRoutes[route] : 'owner';
};

export const userHasRequiredRole = (
  broadcasterRole: BroadcasterRole,
  requiredRole: BroadcasterRole
): boolean => {
  const userRoleLevel = ROLE_LEVELS[broadcasterRole];
  const requiredRoleLevel = ROLE_LEVELS[requiredRole];
  return userRoleLevel >= requiredRoleLevel;
};
