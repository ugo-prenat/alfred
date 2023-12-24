import {
  ICreateTweetPayload,
  ICreateTweetResponse,
  ITwitterFetcherParams
} from '@alfred/models';
import { twitterFetcher } from '@alfred/utils';
import { makeTwitterOAuthOptions } from './twitter.utils';

export const postTweet = (payload: ICreateTweetPayload) => {
  const fetcherParams: ITwitterFetcherParams = {
    host: 'https://api.twitter.com',
    version: '2',
    authorization: makeTwitterOAuthOptions()
  };

  return twitterFetcher.post<ICreateTweetResponse>('/tweets', fetcherParams, {
    body: JSON.stringify(payload)
  });
};
