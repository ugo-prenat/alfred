import { HTTPMethod, ITwitterFetcherParams } from '@stats-station/models';
import { fetcher } from './fetcher';

const TWITTER_FETCHER_ORIGIN = 'twitter';

const makeTwitterFetcher =
  (method: HTTPMethod) =>
  <T>(
    url: string,
    { host, version }: ITwitterFetcherParams,
    init?: RequestInit
  ): Promise<T> =>
    fetcher[method]<T>(`${host}/${version}${url}`, TWITTER_FETCHER_ORIGIN, {
      ...init,
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        ...init?.headers
      }
    });

export const twitterFetcher = {
  get: makeTwitterFetcher('GET'),
  put: makeTwitterFetcher('PUT'),
  post: makeTwitterFetcher('POST'),
  delete: makeTwitterFetcher('DELETE')
};
