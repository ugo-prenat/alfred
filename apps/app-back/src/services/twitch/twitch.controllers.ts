import { APIError, ITwitchFetcherParams } from '@stats-station/models';
import { Context } from 'hono';
import { handleGetBroadcaster, makeTwitchFetcherParams } from './twitch.utils';
import { getBroadcaster, getEventSubSubscriptions } from './twitch.api';
import { logError } from '@/utils/logger.utils';
import { isEmpty } from '@stats-station/utils';

export const getTwitchUser = (c: Context) => {
  const twitchAccessToken = c.req.param('twitchAccessToken');
  const fetcherParams: ITwitchFetcherParams =
    makeTwitchFetcherParams(twitchAccessToken);

  return handleGetBroadcaster(fetcherParams)
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};

export const getTwitchEventSubSubscriptions = (c: Context) => {
  const fetcherParams: ITwitchFetcherParams = makeTwitchFetcherParams(
    process.env.TWITCH_APP_ACCESS_TOKEN
  );

  // à apprfondir -> https://dev.twitch.tv/docs/api/reference/#get-eventsub-subscriptions
  // params, body, headers, etc... pour mieux filtrer les subscriptions

  return getEventSubSubscriptions(fetcherParams)
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};
