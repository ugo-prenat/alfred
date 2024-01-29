import { SCHEDULED_FEATURES } from '@alfred/constants';

export const isValidScheduledFeatureName = (featureName: string): boolean =>
  SCHEDULED_FEATURES.includes(featureName);
