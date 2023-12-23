import { z, ZodSchema } from 'zod';

export interface ICreateBroadcasterPayload {
  twitchToken: string;
}
export const createBrodcasterSchema: ZodSchema<ICreateBroadcasterPayload> =
  z.object({ twitchToken: z.string() });

export interface IRefreshTokenPayload {
  refreshToken: string;
}

export const refreshTokenSchema: ZodSchema<IRefreshTokenPayload> = z.object({
  refreshToken: z.string()
});
