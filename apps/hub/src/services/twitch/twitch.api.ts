import { twitchFetcher } from '@stats-station/utils';
import {
  IGetBroadcasterSubscribersResponse,
  IGetTwitchEventSubSubscriptionResponse,
  IGetTwitchStreamResponse,
  ITwitchEventSubSubscriptionCreation,
  ITwitchFetcherParams
} from '@stats-station/models';

export const createEventSubSubscriptions = (
  fetcherParams: ITwitchFetcherParams,
  payload: ITwitchEventSubSubscriptionCreation
): Promise<IGetTwitchEventSubSubscriptionResponse> =>
  twitchFetcher.post<IGetTwitchEventSubSubscriptionResponse>(
    '/eventsub/subscriptions',
    fetcherParams,
    { body: JSON.stringify(payload) }
  );

export const getBroadcasterSubscribersTotal = (
  broadcasterId: string,
  fetcherParams: ITwitchFetcherParams
): Promise<number> =>
  twitchFetcher
    .get<IGetBroadcasterSubscribersResponse>(
      `/subscriptions?broadcaster_id=${broadcasterId}&first=1`,
      fetcherParams
    )
    .then((data) => data.total);

export const getBroadcasterFollowersTotal = (
  broadcasterId: string,
  fetcherParams: ITwitchFetcherParams
): Promise<number> =>
  twitchFetcher
    .get<IGetBroadcasterSubscribersResponse>(
      `/channels/followers?broadcaster_id=${broadcasterId}&first=1`,
      fetcherParams
    )
    .then((data) => data.total);

export interface IGetStreamParams {
  broadcasterId: string;
  type: 'live' | 'all';
}

export const getStream = (
  { broadcasterId, type }: IGetStreamParams,
  fetcherParams: ITwitchFetcherParams
): Promise<IGetTwitchStreamResponse> =>
  twitchFetcher.get<IGetTwitchStreamResponse>(
    `/streams?user_id=${broadcasterId}&type=${type}`,
    fetcherParams
  );
