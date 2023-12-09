import {
  APIError,
  ICreateTweetResponse,
  ITwitterFetcherParams
} from '@stats-station/models';
import { logError, twitterFetcher } from '@stats-station/utils';
import { Context } from 'hono';
import { postTweet } from './twitter.api';

export const getTwitter = (c: Context) => c.json({ message: 'GET /twitter' });

export const createTweet = (c: Context) => {
  const fetcherParams: ITwitterFetcherParams = {
    host: 'https://api.twitter.com',
    version: '2',
    bearerToken: process.env.TWITTER_BEARER_TOKEN
  };
  const payload = { text: 'station 🚂' };

  return postTweet(c, fetcherParams, payload)
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};
