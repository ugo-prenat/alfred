import {
  EventSubType,
  Feature,
  FeatureName,
  IAPIFeature,
  IRawFeature
} from '@alfred/models';

export const getFeature = (searchParams: Partial<IRawFeature>) =>
  Feature.findOne(searchParams)
    .then((feature: IAPIFeature | null) => {
      if (!feature)
        throw new Error(
          `Feature not found for params ${JSON.stringify(searchParams)}}`
        );
      return feature;
    })
    .catch((err) => {
      throw new Error(err.message);
    });

export const getFeatureNameByEventSubType = (
  type: EventSubType,
  subType?: string
): FeatureName => {
  const featureName: FeatureName | undefined =
    type === 'stream.online'
      ? 'stream-up'
      : type === 'stream.offline'
        ? 'stream-down'
        : subType === 'subscription'
          ? 'subscribers-goal-end'
          : subType === 'follower'
            ? 'followers-goal-end'
            : undefined;

  if (!featureName)
    throw new Error(
      `Feature name not found for eventSub type '${type}' ${
        subType ? `and subType '${subType}'` : ''
      } `
    );
  return featureName;
};
