import { APIError, ITwitchFetcherParams } from '@stats-station/models';
import { Context, Env } from 'hono';
import { handleGetBroadcaster, makeTwitchFetcherParams } from './twitch.utils';
import { getEventSubSubscriptions } from './twitch.api';
import { logError } from '@/utils/logger.utils';
import { ICreateBroadcasterPayload } from './twitch.models';

export const getTwitchBroadcaster = (c: Context) => {
  const twitchAccessToken = c.req.query('token');
  const { method, url } = c.req.raw;

  if (!twitchAccessToken) {
    const error = new APIError('No access token provided', 400, {
      api: 'app-back',
      method,
      url
    });
    return c.json(logError(error), 400);
  }

  const fetcherParams: ITwitchFetcherParams =
    makeTwitchFetcherParams(twitchAccessToken);

  return handleGetBroadcaster(fetcherParams)
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};

export const createTwitchBroadcaster = async (c: Context) => {
  const twitchToken = await c.req.json();

  const maybeBroadcaster = '';

  return c.json({ message: 'ok' });
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
