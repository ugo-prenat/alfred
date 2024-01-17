import {
  IAPIFeature,
  IDBBot,
  IDBFeature,
  IFeature,
  IFeatureConf,
  IFrontFeature,
  IRawFeature
} from '@alfred/models';

export const makeRawFeature = (
  { type, name, defaultStatus, availability }: IFeatureConf,
  broadcasterBot: IDBBot
): IRawFeature => {
  const featureBase: Omit<IRawFeature, 'type'> = {
    name,
    availability,
    botId: broadcasterBot._id,
    text: `Alfred ${name} feature`,
    status: broadcasterBot.status !== 'active' ? 'unavailable' : defaultStatus
  };

  switch (type) {
    case 'eventSub':
      return { ...featureBase, type, featureActivatedOnTwitch: false };
    case 'recurring':
      return { ...featureBase, type, cron: '0 0 * * *' };
    case 'manual':
      return { ...featureBase, type };
  }
};

export const makeAPIFeatureToFeature = (feature: IAPIFeature): IFeature => {
  const { _id, ...rest } = feature.toObject();
  return { id: _id.toString(), ...rest };
};

export const makeAPIFeaturesToFeatures = (
  features: IAPIFeature[]
): IFeature[] => features.map(makeAPIFeatureToFeature);

export const makeAPIFeatureToFrontFeature = (
  feature: IAPIFeature
): IFrontFeature => {
  const { _id, createdAt, updatedAt, ...rest } = feature.toObject();
  return rest;
};

export const makeDbFeatureToFrontFeature = (
  feature: IDBFeature
): IFrontFeature => {
  const { _id, createdAt, updatedAt, ...rest } = feature;
  return rest;
};
