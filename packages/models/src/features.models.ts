import {
  FEATURES_TYPES,
  FEATURES_STATUS,
  FEATURES_AVAILABILITY,
  ENABLED_FEATURE_STATUS,
  DISABLED_FEATURE_STATUS
} from '@alfred/constants';
import mongoose, { Document, Schema } from 'mongoose';
import { BOTS_COLLECTION } from './bots.models';
import { FEATURES_NAMES } from '@alfred/constants';

export const FEATURES_COLLECTION = 'features';

export type FeatureType = (typeof FEATURES_TYPES)[number];
export type FeatureStatus = (typeof FEATURES_STATUS)[number];
export type FeatureName = (typeof FEATURES_NAMES)[number];
export type FeatureAvailability = (typeof FEATURES_AVAILABILITY)[number];

interface IDBFeature extends IRawFeature {
  _id: mongoose.Types.ObjectId;
}

export interface IAPIFeature extends Document<unknown, {}, IDBFeature> {}

export interface IFeature extends IRawFeature {
  id: string;
}

export interface IFeatureConf {
  type: FeatureType;
  name: FeatureName;
  availability: FeatureAvailability;
  defaultStatus: FeatureStatus;
}

export interface IRawFeature {
  botId: mongoose.Types.ObjectId;
  type: FeatureType;
  name: FeatureName;
  status: FeatureStatus;
  text: string;
  cron?: string;
  availability: FeatureAvailability;
}

export interface IFrontFeature extends Omit<IRawFeature, 'botId'> {}

export interface IFeatureEditableProps {
  status?: typeof DISABLED_FEATURE_STATUS | typeof ENABLED_FEATURE_STATUS;
  text?: string;
  cron?: string;
}

const featureSchema = new Schema(
  {
    botId: {
      type: Schema.Types.ObjectId,
      ref: BOTS_COLLECTION,
      required: true
    },
    type: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    text: { type: String, required: true },
    cron: { type: String },
    availability: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
);

export const Feature = mongoose.model(FEATURES_COLLECTION, featureSchema);
