import { IRawChannelSummary } from '@alfred/models';
import { twitchTrackerFetcher } from '@alfred/utils';

export const getBroadcasterMonthlyRecap = (twitchUsername: string) =>
  twitchTrackerFetcher.get<IRawChannelSummary>(
    `/channels/summary/${twitchUsername}`
  );
