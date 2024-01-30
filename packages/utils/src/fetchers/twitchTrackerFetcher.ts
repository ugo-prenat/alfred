import { HTTPMethod } from '@alfred/models';
import { fetcher } from './fetcher';

const TWITCH_TRACKER_FETCHER_ORIGIN = 'twitch-tracker';
const TWITCH_TRACKER_API_URL = 'https://twitchtracker.com/api';

const makeTwitchTrackerFetcher =
  (method: HTTPMethod) =>
  <T>(url: string): Promise<T> =>
    fetcher[method]<T>(
      `${TWITCH_TRACKER_API_URL}${url}`,
      TWITCH_TRACKER_FETCHER_ORIGIN
    );

export const twitchTrackerFetcher = {
  get: makeTwitchTrackerFetcher('GET')
};
