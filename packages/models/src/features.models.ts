import { FEATURES_TYPES, FEATURES_STATUS } from '@alfred/constants';
import mongoose, { Document, Schema } from 'mongoose';
import { BOTS_COLLECTION } from './bots.models';
import { FEATURES_NAMES } from '@alfred/constants';

export const FEATURES_COLLECTION = 'features';

export type FeatureType = (typeof FEATURES_TYPES)[number];
export type FeatureStatus = (typeof FEATURES_STATUS)[number];
export type FeatureName = (typeof FEATURES_NAMES)[number];

interface IDBFeature extends IRawFeature {
  _id: mongoose.Types.ObjectId;
}

export interface IAPIFeature extends Document<unknown, {}, IDBFeature> {}

export interface IFeature extends IRawFeature {
  id: string;
}

export interface IRawFeature {
  botId: mongoose.Types.ObjectId;
  type: FeatureType;
  status: FeatureStatus;
  text: string;
  cron?: string;
}

export interface IFeatureConf {
  type: FeatureType;
  name: FeatureName;
  status: 'active' | 'inactive' | 'coming-soon';
}

const featureSchema = new Schema(
  {
    botId: {
      type: Schema.Types.ObjectId,
      ref: BOTS_COLLECTION,
      required: true
    },
    type: { type: String, required: true },
    status: { type: String, required: true },
    text: { type: String, required: true },
    cron: { type: String }
  },
  { versionKey: false, timestamps: true }
);

export const Feature = mongoose.model(FEATURES_COLLECTION, featureSchema);
