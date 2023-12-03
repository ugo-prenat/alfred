import { HTTPMethod } from '@stats-station/models';
import { fetcher } from './fetcher';
import { ITwitchFetcherParams, TWITCH_API_URL } from './fetcher.models';

const makeTwitchFetcher =
  (method: HTTPMethod) =>
  <T>(
    url: string,
    { twitchAccessToken, twitchClientId }: ITwitchFetcherParams,
    init?: RequestInit
  ): Promise<T> =>
    fetcher[method]<T>(`${TWITCH_API_URL}${url}`, {
      headers: {
        'Client-Id': twitchClientId,
        Authorization: `Bearer ${twitchAccessToken}`,
        ...init?.headers
      },
      ...init
    });

export const twitchFetcher = {
  get: makeTwitchFetcher('GET'),
  put: makeTwitchFetcher('PUT'),
  post: makeTwitchFetcher('POST'),
  delete: makeTwitchFetcher('DELETE')
};