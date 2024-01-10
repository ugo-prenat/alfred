import { Types } from 'mongoose';
import {
  IAPIFeature,
  IFeature,
  IFeatureConf,
  IRawFeature
} from '@alfred/models';

export const makeRawFeature = (
  { type, name, defaultStatus }: IFeatureConf,
  botId: Types.ObjectId
): IRawFeature => ({
  botId,
  type,
  name,
  status: defaultStatus,
  text: `Alfred ${name} feature`
});

export const makeAPIFeatureToFeature = (feature: IAPIFeature): IFeature => {
  const { _id, ...rest } = feature.toObject();
  return { id: _id.toString(), ...rest };
};

export const makeAPIFeaturesToFeatures = (
  features: IAPIFeature[]
): IFeature[] => features.map(makeAPIFeatureToFeature);
