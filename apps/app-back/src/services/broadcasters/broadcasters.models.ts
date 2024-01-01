import { z, ZodSchema } from 'zod';

export interface ITwitchTokenPayload {
  twitchToken: string;
}
export const twitchTokenSchema: ZodSchema<ITwitchTokenPayload> = z.object({
  twitchToken: z.string()
});

export interface IRefreshTokenPayload {
  refreshToken: string;
}

export const refreshTokenSchema: ZodSchema<IRefreshTokenPayload> = z.object({
  refreshToken: z.string()
});
