import {
  ICreateTweetPayload,
  ICreateTweetResponse,
  ITwitterFetcherParams
} from '@stats-station/models';
import { twitterFetcher } from '@stats-station/utils';
import { makeTwitterOAuthOptions } from './twitter.utils';

export const createTweet = (payload: ICreateTweetPayload) => {
  const fetcherParams: ITwitterFetcherParams = {
    host: 'https://api.twitter.com',
    version: '2',
    authorization: makeTwitterOAuthOptions()
  };

  return twitterFetcher.post<ICreateTweetResponse>('/tweets', fetcherParams, {
    body: JSON.stringify(payload)
  });
};
