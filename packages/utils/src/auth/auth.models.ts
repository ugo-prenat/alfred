import { BroadcasterRole } from '@alfred/models';

export interface IJwtPayload {
  sub: string;
  role: BroadcasterRole;
  iss: string;
  iat: number;
  exp: number;
}
