import { Types } from 'mongoose';
import {
  IAPIFeature,
  IFeature,
  IFeatureConf,
  IFrontFeature,
  IRawFeature
} from '@alfred/models';

export const makeRawFeature = (
  { type, name, defaultStatus, availability }: IFeatureConf,
  botId: Types.ObjectId
): IRawFeature => {
  const featureBase = {
    botId,
    name,
    status: defaultStatus,
    text: `Alfred ${name} feature`,
    availability
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
