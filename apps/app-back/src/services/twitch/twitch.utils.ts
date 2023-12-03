import { ITwitchFetcherParams } from '@stats-station/utils';

export const makeTwitchFetcherParams = (
  twitchAccessToken: string
): ITwitchFetcherParams => ({
  twitchAccessToken,
  twitchClientId: process.env.TWITCH_CLIENT_ID
});
