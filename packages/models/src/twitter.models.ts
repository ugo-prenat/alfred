import { HTTPMethod } from '../dist';

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
