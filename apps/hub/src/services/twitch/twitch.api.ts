import { twitchFetcher } from '@alfred/utils';
import {
  IGetTwitchClipsResponse,
  IGetTwitchEventSubSubscriptionResponse,
  IGetTwitchStreamResponse,
  ITwitchEventSubSubscriptionCreation
} from '@alfred/models';
import { makeTwitchFetcherParams } from './twitch.utils';

export const createEventSubSubscriptions = (
  payload: ITwitchEventSubSubscriptionCreation
): Promise<IGetTwitchEventSubSubscriptionResponse> =>
  twitchFetcher.post<IGetTwitchEventSubSubscriptionResponse>(
    '/eventsub/subscriptions',
    makeTwitchFetcherParams(process.env.TWITCH_APP_ACCESS_TOKEN),
    { body: JSON.stringify(payload) }
  );

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

interface IGetClipsParams {
  broadcasterId: string;
  startedAt: string;
  endedAt: string;
}
export const getClips = ({
  broadcasterId,
  startedAt,
  endedAt
}: IGetClipsParams): Promise<IGetTwitchClipsResponse> =>
  twitchFetcher.get<IGetTwitchClipsResponse>(
    `/clips?broadcaster_id=${broadcasterId}&started_at=${startedAt}&ended_at=${endedAt}&first=100`,
    makeTwitchFetcherParams(process.env.TWITCH_APP_ACCESS_TOKEN)
  );
