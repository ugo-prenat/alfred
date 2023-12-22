import { HTTPMethod, ITwitterFetcherParams } from '@alfred/models';
import { fetcher } from './fetcher';
import { makeTwitterOAuth1a } from './fetcher.utils';

const TWITTER_FETCHER_ORIGIN = 'twitter';

const makeTwitterFetcher =
  (method: HTTPMethod) =>
  <T>(
    pathUrl: string,
    { host, version, authorization }: ITwitterFetcherParams,
    init?: RequestInit
  ): Promise<T> => {
    const url = `${host}/${version}${pathUrl}`;
    return fetcher[method]<T>(url, TWITTER_FETCHER_ORIGIN, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Authorization: makeTwitterOAuth1a({ method, url }, authorization),
        ...init?.headers
      }
    });
  };

export const twitterFetcher = {
  get: makeTwitterFetcher('GET'),
  put: makeTwitterFetcher('PUT'),
  post: makeTwitterFetcher('POST'),
  delete: makeTwitterFetcher('DELETE')
};
