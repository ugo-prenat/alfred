import {
  IGetTwitchBroadcasterGoalsResponse,
  IGetTwitchBroadcastersResponse,
  IGetTwitchEventSubSubscriptionResponse,
  ITwitchFetcherParams
} from '@alfred/models';
import { twitchFetcher } from '@alfred/utils';

export const getBroadcaster = (
  fetcherParams: ITwitchFetcherParams
): Promise<IGetTwitchBroadcastersResponse> =>
  twitchFetcher.get<IGetTwitchBroadcastersResponse>(`/users`, fetcherParams);

export const getEventSubSubscriptions = (
  fetcherParams: ITwitchFetcherParams
): Promise<IGetTwitchEventSubSubscriptionResponse> =>
  twitchFetcher.get<IGetTwitchEventSubSubscriptionResponse>(
    `/eventsub/subscriptions`,
    fetcherParams
  );

export const getBroadcasterGoals = (
  broadcasterId: string,
  fetcherParams: ITwitchFetcherParams
): Promise<IGetTwitchBroadcasterGoalsResponse> =>
  twitchFetcher.get(`/goals?broadcaster_id=${broadcasterId}`, fetcherParams);
