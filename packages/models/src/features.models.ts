import {
  FEATURES_TYPES,
  FEATURES_STATUS,
  FEATURES_AVAILABILITY,
  ENABLED_FEATURE_STATUS,
  DISABLED_FEATURE_STATUS,
  RECURRING_FEATURE_TYPE,
  EVENTSUB_FEATURE_TYPE,
  MANUAL_FEATURE_TYPE
} from '@alfred/constants';
import mongoose, { Document, Schema } from 'mongoose';
import { BOTS_COLLECTION } from './bots.models';
import { FEATURES_NAMES } from '@alfred/constants';

export const FEATURES_COLLECTION = 'features';

export type FeatureType = (typeof FEATURES_TYPES)[number];
export type FeatureStatus = (typeof FEATURES_STATUS)[number];
export type FeatureName = (typeof FEATURES_NAMES)[number];
export type FeatureAvailability = (typeof FEATURES_AVAILABILITY)[number];

export type IDBFeature = IRawFeature & {
  _id: mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
};

export type IAPIFeature = Document<unknown, {}, IDBFeature> & {};

export type IFeature = IRawFeature & {
  id: string;
};

export interface IFeatureConf {
  type: FeatureType;
  name: FeatureName;
  availability: FeatureAvailability;
  defaultStatus: FeatureStatus;
}

export interface IRecurringFeature {
  type: typeof RECURRING_FEATURE_TYPE;
  cron: string;
}

export interface IEventSubFeature {
  type: typeof EVENTSUB_FEATURE_TYPE;
  featureActivatedOnTwitch: boolean;
}

export interface IManualFeature {
  type: typeof MANUAL_FEATURE_TYPE;
}

export type IRawFeature = {
  botId: mongoose.Types.ObjectId;
  name: FeatureName;
  status: FeatureStatus;
  text: string;
  availability: FeatureAvailability;
} & (IRecurringFeature | IEventSubFeature | IManualFeature);

export type IFrontFeature = IRawFeature; // /!\ les discriminating unions de IRawFeatures sont sensibles

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
    featureActivatedOnTwitch: { type: Boolean },
    availability: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
);

export const Feature = mongoose.model(FEATURES_COLLECTION, featureSchema);
