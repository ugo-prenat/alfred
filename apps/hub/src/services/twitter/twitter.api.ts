import {
  ICreateTweetPayload,
  ICreateTweetResponse,
  ITwitterFetcherParams
} from '@stats-station/models';
import { twitterFetcher } from '@stats-station/utils';
import { Context } from 'hono';

export const postTweet = (
  c: Context,
  fetcherParams: ITwitterFetcherParams,
  payload: ICreateTweetPayload
) =>
  twitterFetcher.post<ICreateTweetResponse>('/tweets', fetcherParams, {
    body: JSON.stringify(payload)
  });
