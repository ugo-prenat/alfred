import {
  IGetTwitchEventSubSubscriptionResponse,
  IGetTwitchUsersResponse
} from '@stats-station/models';
import { ITwitchFetcherParams, twitchFetcher } from '@stats-station/utils';

export const getUser = (
  fetcherParams: ITwitchFetcherParams
): Promise<IGetTwitchUsersResponse> =>
  twitchFetcher.get<IGetTwitchUsersResponse>(`/users`, fetcherParams);

export const getEventSubSubscriptions = (
  fetcherParams: ITwitchFetcherParams
): Promise<IGetTwitchEventSubSubscriptionResponse> =>
  twitchFetcher.get<IGetTwitchEventSubSubscriptionResponse>(
    `/eventsub/subscriptions`,
    fetcherParams
  );
