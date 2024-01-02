import { TwitchBroadcasterType } from './twitch.models';
import mongoose, { Document, Schema } from 'mongoose';
import { ROLES } from '@alfred/constants';

export const BROADCASTERS_COLLECTION = 'broadcasters';
export type BroadcasterRole = (typeof ROLES)[number];

interface IDBBroadcaster extends IRawBroadcaster {
  _id: mongoose.Types.ObjectId;
}

export interface IAPIBroadcaster
  extends Document<unknown, {}, IDBBroadcaster> {}

export interface IBroadcaster extends IRawBroadcaster {
  id: string;
}

export interface IFrontBroadcaster {
  id: string;
  botId: string;
  name: string;
  username: string;
  role: BroadcasterRole;
  profileImgUrl: string;
}

export interface IRawBroadcaster {
  name: string;
  email: string;
  botId: mongoose.Types.ObjectId;
  username: string;
  twitchId: string;
  role: BroadcasterRole;
  twitchToken: string;
  profileImgUrl: string;
  twitchType: TwitchBroadcasterType;
}

const broadcasterSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    botId: { type: Schema.Types.ObjectId, ref: 'bots', required: true },
    username: { type: String, required: true },
    twitchId: { type: String, required: true },
    role: { type: String, required: true },
    twitchToken: { type: String, required: true },
    profileImgUrl: { type: String, required: true },
    twitchType: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
);

export const Broadcaster = mongoose.model(
  BROADCASTERS_COLLECTION,
  broadcasterSchema
);
