import mongoose, { Document, Schema } from 'mongoose';
import { BROADCASTERS_COLLECTION } from './broadcasters.models';

export const BOTS_COLLECTION = 'bots';
export type BotStatus = 'pending' | 'active' | 'inactive';

export interface IDBBot extends IRawBot {
  _id: mongoose.Types.ObjectId;
}

export interface IAPIBot extends Document<unknown, {}, IDBBot> {}

export interface IBot extends IRawBot {
  id: string;
}

export interface IFrontBot {
  id: string;
  name: string;
  username: string;
  status: BotStatus;
  profileImgUrl: string;
}

export interface IRawBot {
  name: string;
  username: string;
  status: BotStatus;
  broadcasterId: string;
  profileImgUrl: string;
}

const botSchema = new Schema(
  {
    broadcasterId: {
      type: Schema.Types.ObjectId,
      ref: BROADCASTERS_COLLECTION,
      required: true
    },
    name: { type: String, required: true },
    status: { type: String, required: true },
    username: { type: String, required: true },
    profileImgUrl: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
);

export const Bot = mongoose.model(BOTS_COLLECTION, botSchema);
