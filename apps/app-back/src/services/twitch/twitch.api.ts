import {
  IGetTwitchBroadcastersResponse,
  IGetTwitchEventSubSubscriptionResponse,
  ITwitchFetcherParams
} from '@stats-station/models';
import { twitchFetcher } from '@stats-station/utils';

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
