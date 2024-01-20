import {
  IGetTwitchBroadcasterGoalsResponse,
  IGetTwitchBroadcastersResponse,
  IGetTwitchEventSubSubscriptionResponse,
  ITwitchEventSubSubscriptionCreation,
  ITwitchFetcherParams
} from '@alfred/models';
import { twitchFetcher } from '@alfred/utils';
import { makeTwitchFetcherParams } from './twitch.utils';

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

export const createEventSubSubscriptions = (
  payload: ITwitchEventSubSubscriptionCreation
): Promise<IGetTwitchEventSubSubscriptionResponse> =>
  twitchFetcher.post<IGetTwitchEventSubSubscriptionResponse>(
    '/eventsub/subscriptions',
    makeTwitchFetcherParams(process.env.TWITCH_APP_ACCESS_TOKEN),
    { body: JSON.stringify(payload) }
  );

export const deleteEventSubSubscriptions = (
  subscriptionId: string
): Promise<void> =>
  twitchFetcher.delete(
    `/eventsub/subscriptions?id=${subscriptionId}`,
    makeTwitchFetcherParams(process.env.TWITCH_APP_ACCESS_TOKEN)
  );

export const getBroadcasterGoals = (
  broadcasterId: string,
  fetcherParams: ITwitchFetcherParams
): Promise<IGetTwitchBroadcasterGoalsResponse> =>
  twitchFetcher.get(`/goals?broadcaster_id=${broadcasterId}`, fetcherParams);
