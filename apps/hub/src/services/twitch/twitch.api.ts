import { twitchFetcher } from '@stats-station/utils';
import {
  IGetBroadcasterSubscribersResponse,
  IGetTwitchEventSubSubscriptionResponse,
  IGetTwitchStreamResponse,
  ITwitchEventSubSubscriptionCreation
} from '@stats-station/models';
import { makeTwitchFetcherParams } from './twitch.utils';

export const createEventSubSubscriptions = (
  payload: ITwitchEventSubSubscriptionCreation
): Promise<IGetTwitchEventSubSubscriptionResponse> =>
  twitchFetcher.post<IGetTwitchEventSubSubscriptionResponse>(
    '/eventsub/subscriptions',
    makeTwitchFetcherParams(process.env.TWITCH_APP_ACCESS_TOKEN),
    { body: JSON.stringify(payload) }
  );

export const getBroadcasterSubscribersTotal = (
  broadcasterId: string
): Promise<number> =>
  twitchFetcher
    .get<IGetBroadcasterSubscribersResponse>(
      `/subscriptions?broadcaster_id=${broadcasterId}&first=1`,
      makeTwitchFetcherParams(process.env.TEMP_TWITCH_USER_ACCESS_TOKEN)
    )
    .then((data) => data.total);

export const getBroadcasterFollowersTotal = (
  broadcasterId: string
): Promise<number> =>
  twitchFetcher
    .get<IGetBroadcasterSubscribersResponse>(
      `/channels/followers?broadcaster_id=${broadcasterId}&first=1`,
      makeTwitchFetcherParams(process.env.TEMP_TWITCH_USER_ACCESS_TOKEN)
    )
    .then((data) => data.total);

export interface IGetStreamParams {
  broadcasterId: string;
  type: 'live' | 'all';
}

export const getStream = ({
  broadcasterId,
  type
}: IGetStreamParams): Promise<IGetTwitchStreamResponse> =>
  twitchFetcher.get<IGetTwitchStreamResponse>(
    `/streams?user_id=${broadcasterId}&type=${type}`,
    makeTwitchFetcherParams(process.env.TWITCH_APP_ACCESS_TOKEN)
  );
