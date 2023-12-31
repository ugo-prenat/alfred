import { HTTPMethod, ITwitchFetcherParams } from '@alfred/models';
import { fetcher } from './fetcher';

const TWITCH_FETCHER_ORIGIN = 'twitch';
export const TWITCH_API_URL = 'https://api.twitch.tv/helix';

const makeTwitchFetcher =
  (method: HTTPMethod) =>
  <T>(
    url: string,
    { twitchAccessToken, twitchClientId }: ITwitchFetcherParams,
    init?: RequestInit
  ): Promise<T> =>
    fetcher[method]<T>(`${TWITCH_API_URL}${url}`, TWITCH_FETCHER_ORIGIN, {
      headers: {
        'Content-Type': 'application/json',
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
