import { IChannelSummary } from '@alfred/models';
import { twitchTrackerFetcher } from '@alfred/utils';

export const getBroadcasterMonthlyRecap = (twitchUsername: string) =>
  twitchTrackerFetcher.get<IChannelSummary>(
    `/channels/summary/${twitchUsername}`
  );
