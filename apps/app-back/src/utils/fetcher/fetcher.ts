import { HTTPMethod } from '@stats-station/models';
import { fetcher as genericFetcher } from '@stats-station/utils';

const TWITCH_API_URL = 'https://api.twitch.tv/helix';

const makeTwitchFetcher =
  (method: HTTPMethod) =>
  <T>(url: string, twitchAccessToken: string, init?: RequestInit): Promise<T> =>
    genericFetcher[method]<T>(`${TWITCH_API_URL}${url}`, {
      headers: {
        'Client-Id': process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${twitchAccessToken}`
      },
      ...init
    });

export const twitchFetcher = {
  get: makeTwitchFetcher('GET'),
  put: makeTwitchFetcher('PUT'),
  post: makeTwitchFetcher('POST'),
  delete: makeTwitchFetcher('DELETE')
};
