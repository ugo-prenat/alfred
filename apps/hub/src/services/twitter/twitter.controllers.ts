import {
  APIError,
  ICreateTweetPayload,
  ITwitterOAuthOptions
} from '@stats-station/models';
import { logError } from '@stats-station/utils';
import { Context } from 'hono';
import { createTweet } from './twitter.api';

export const handleCreateTweet = (c: Context) => {
  const oAuthOptions: ITwitterOAuthOptions = {
    api_key: process.env.TWITTER_API_KEY,
    api_secret_key: process.env.TWITTER_API_KEY_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  };
  const payload: ICreateTweetPayload = { text: 'station 🚂' };

  return createTweet(oAuthOptions, payload)
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};
