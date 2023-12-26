import {
  JWT_ALGORITHM,
  JWT_EXPIRATION_TIME,
  JWT_REFRESH_EXPIRATION_TIME,
  ROLE_LEVELS
} from '@alfred/constants';
import { BroadcasterRole } from '@alfred/models';
import { sign } from 'hono/jwt';
import { IJwtPayload } from './auth.models';

export const signAccessToken = (
  sub: string,
  role: BroadcasterRole,
  secret: string
): Promise<string> => {
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    sub,
    role,
    iss: 'Alfred',
    iat: now,
    exp: now + JWT_EXPIRATION_TIME
  };
  return sign(payload, secret, JWT_ALGORITHM);
};

export const signRefreshToken = (
  sub: string,
  role: BroadcasterRole,
  secret: string
): Promise<string> => {
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    sub,
    role,
    iss: 'Alfred',
    iat: now,
    exp: now + JWT_REFRESH_EXPIRATION_TIME
  };
  return sign(payload, secret, JWT_ALGORITHM);
};

const userHasRequiredRole = (
  userRole: BroadcasterRole,
  requiredRole: BroadcasterRole
): boolean => {
  const userRoleLevel = ROLE_LEVELS[userRole];
  const requiredRoleLevel = ROLE_LEVELS[requiredRole];
  return userRoleLevel >= requiredRoleLevel;
};

export const checkIfUsercanPerformAction = (
  jwt: IJwtPayload,
  {
    requiredRole,
    broadcasterId
  }: { requiredRole: BroadcasterRole; broadcasterId: string }
): boolean => {
  const userCanPerformAction = broadcasterId === jwt.sub;

  if (!userHasRequiredRole(jwt.role, requiredRole) && !userCanPerformAction)
    throw new Error("You don't have permission to call this endpoint");

  return true;
};
