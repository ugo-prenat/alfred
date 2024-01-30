import { SCHEDULED_FEATURES } from '@alfred/constants';
import { Feature, FeatureName, IAPIFeature } from '@alfred/models';

export const isValidScheduledFeatureName = (featureName: string): boolean =>
  SCHEDULED_FEATURES.includes(featureName);

export const getAllEnabledFeaturesByName = async (
  featureName: FeatureName
): Promise<IAPIFeature[]> =>
  Feature.find({
    name: featureName,
    status: 'enabled',
    availability: 'active'
  });
