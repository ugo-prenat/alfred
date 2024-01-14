import {
  DISABLED_FEATURE_STATUS,
  ENABLED_FEATURE_STATUS
} from '@alfred/constants';
import { z } from 'zod';

export const updateFeaturePayloadSchema = z.object({
  status: z.enum([ENABLED_FEATURE_STATUS, DISABLED_FEATURE_STATUS]).optional(),
  text: z.string().optional(),
  cron: z.string().optional()
});
export interface IUpdateFeaturePayload
  extends z.infer<typeof updateFeaturePayloadSchema> {}
