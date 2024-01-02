import { z } from 'zod';

export const loginPayloadSchema = z.object({
  twitchToken: z.string()
});
export interface ILoginPayload extends z.infer<typeof loginPayloadSchema> {}

export const refreshTokenSchema = z.object({
  refreshToken: z.string()
});
export interface IRefreshTokenPayload
  extends z.infer<typeof refreshTokenSchema> {}
