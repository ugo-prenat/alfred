import {
  ICreateTweetPayload,
  ICreateTweetResponse,
  ITwitterFetcherParams,
  ITwitterOAuthOptions
} from '@stats-station/models';
import { twitterFetcher } from '@stats-station/utils';

export const createTweet = (
  oAuthOptions: ITwitterOAuthOptions,
  payload: ICreateTweetPayload
) => {
  const fetcherParams: ITwitterFetcherParams = {
    host: 'https://api.twitter.com',
    version: '2',
    authorization: oAuthOptions
  };

  return twitterFetcher.post<ICreateTweetResponse>('/tweets', fetcherParams, {
    body: JSON.stringify(payload)
  });
};
