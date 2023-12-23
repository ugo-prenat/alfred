import { z, ZodSchema } from 'zod';

export interface ICreateBroadcasterPayload {
  twitchToken: string;
}
export const createBrodcasterSchema: ZodSchema<ICreateBroadcasterPayload> =
  z.object({ twitchToken: z.string() });
