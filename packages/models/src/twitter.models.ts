import mongoose, { Document, Schema } from 'mongoose';
import { HTTPMethod } from './common.models';
import { BROADCASTERS_COLLECTION } from './broadcasters.models';
import { BOTS_COLLECTION } from './bots.models';

export interface ITwitterFetcherParams {
  host: 'https://api.twitter.com' | 'https://upload.twitter.com';
  version: '2' | '1.1';
  authorization: ITwitterOAuthOptions;
}

export interface ITwitterOAuthOptions {
  api_key: string;
  api_secret_key: string;
  access_token: string;
  access_token_secret: string;
}

export type ITwitterExtendedOAuthOptions = {
  oauth_nonce: string;
  oauth_timestamp: number;
};

export interface ITwitterRequestOptions {
  method: HTTPMethod;
  url: string;
  params?: Record<string, string | number | boolean>;
  data?: Record<string, string | number | boolean>;
}

export type TwitterSignatureOAuthOptions = Pick<
  ITwitterOAuthOptions,
  'access_token' | 'api_key'
> &
  ITwitterExtendedOAuthOptions;

export interface ICreateTweetResponse {
  data: {
    edit_history_tweet_ids?: string[];
    id: string;
    text: string;
  };
}

export interface ICreateTweetPayload {
  text: string;
}

const TWEETS_COLLECTION = 'tweets';

export interface IDBTweet extends IRawTweet {
  _id: mongoose.Types.ObjectId;
}

export interface IAPITweet extends Document<unknown, {}, IDBTweet> {}

export interface ITweet extends IRawTweet {
  id: string;
}

export interface IRawTweet {
  tweetId: string;
  text: string;
  botId: string;
  broadcasterId: string;
}

const tweetSchema = new Schema(
  {
    tweetId: { type: String, required: true },
    text: { type: String, required: true },
    botId: {
      type: Schema.Types.ObjectId,
      ref: BOTS_COLLECTION,
      required: true
    },
    broadcasterId: {
      type: Schema.Types.ObjectId,
      ref: BROADCASTERS_COLLECTION,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
);

export const Tweet = mongoose.model(TWEETS_COLLECTION, tweetSchema);
