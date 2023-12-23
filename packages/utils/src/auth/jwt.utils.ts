import { ROLE_LEVELS } from '@alfred/constants';
import { BroadcasterRole } from '@alfred/models';
import { sign } from 'hono/jwt';

const JWT_EXPIRATION_TIME = 60 * 60; // 1 hour

export interface ITokenPayload {
  sub: string;
  role: BroadcasterRole;
}

export const signJwt = (
  rawPayload: ITokenPayload,
  secret: string
): Promise<string> => {
  const { sub, role } = rawPayload;
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    sub,
    role,
    iss: 'Alfred',
    iat: now,
    exp: now + JWT_EXPIRATION_TIME
  };

  return sign(payload, secret, 'HS256');
};

export const userHasRequiredRole = (
  userRole: BroadcasterRole,
  requiredRole: BroadcasterRole
): boolean => {
  const userRoleLevel = ROLE_LEVELS[userRole];
  const requiredRoleLevel = ROLE_LEVELS[requiredRole];

  return userRoleLevel >= requiredRoleLevel;
};
