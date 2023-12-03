import {
  IGetTwitchUsersResponse,
  IGetTwitchEventSubSubscriptionResponse,
  APIError
} from '@stats-station/models';
import { ITwitchFetcherParams, twitchFetcher } from '@stats-station/utils';
import { Context } from 'hono';
import { makeTwitchFetcherParams } from './twitch.utils';

export const getTwitchUser = (c: Context) => {
  const twitchAccessToken = c.req.param('twitchAccessToken');
  const fetcherParams: ITwitchFetcherParams =
    makeTwitchFetcherParams(twitchAccessToken);

  return twitchFetcher
    .get<IGetTwitchUsersResponse>(`/users`, fetcherParams)
    .then((res) => c.json(res.data[0]))
    .catch((err: APIError) =>
      c.json({ message: err.message, stack: err.stack }, err.status)
    );
};

export const getTwitchUserEventSubSubscriptions = (c: Context) => {
  const twitchAccessToken = c.req.param('twitchAccessToken');
  const fetcherParams: ITwitchFetcherParams =
    makeTwitchFetcherParams(twitchAccessToken);

  // à apprfondir -> https://dev.twitch.tv/docs/api/reference/#get-eventsub-subscriptions
  // params, body, headers, etc... pour mieux filtrer les subscriptions

  return twitchFetcher
    .get<IGetTwitchEventSubSubscriptionResponse>(
      `/eventsub/subscriptions`,
      fetcherParams
    )
    .then((res) => c.json(res))
    .catch((err: APIError) =>
      c.json({ message: err.message, stack: err.stack }, err.status)
    );
};
