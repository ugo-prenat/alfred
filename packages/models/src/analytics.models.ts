import mongoose, { Document, Schema } from 'mongoose';
import { IChannelSummary } from './twitchTracker.models';
import { MONTHLY_RECAP_FEATURE } from '@alfred/constants';

export const ANALYTICS_COLLECTION = 'analytics';

export interface IDBAnalytics extends IRawAnalytics {
  _id: mongoose.Types.ObjectId;
}

export interface IAPIAnalytics extends Document<unknown, {}, IDBAnalytics> {}

export interface IAnalytics extends IRawAnalytics {
  id: string;
}

export interface IMonthlyRecapAnalytics extends IChannelSummary {
  feature: typeof MONTHLY_RECAP_FEATURE;
}

export type IRawAnalytics = {
  botId: mongoose.Types.ObjectId;
} & IMonthlyRecapAnalytics;

const analyticsSchema = new Schema(
  {
    botId: {
      type: Schema.Types.ObjectId,
      ref: ANALYTICS_COLLECTION,
      required: true
    },
    feature: { type: String, required: true },
    rank: { type: Number, required: true },
    minutesStreamed: { type: Number, required: true },
    avgViewers: { type: Number, required: true },
    maxViewers: { type: Number, required: true },
    hoursWatched: { type: Number, required: true },
    followers: { type: Number, required: true },
    followersTotal: { type: Number, required: true }
  },
  { versionKey: false, timestamps: true }
);

export const Analytics = mongoose.model(ANALYTICS_COLLECTION, analyticsSchema);
