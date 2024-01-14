import { COMING_SOON_FEATURE_AVAILABILITY } from '@alfred/constants';
import { FeatureStatus } from '@alfred/models';

export type FrontFeatureStatus =
  | FeatureStatus
  | typeof COMING_SOON_FEATURE_AVAILABILITY;
