import { ITwitchFetcherParams, logError } from '@stats-station/utils';
import { Context } from 'hono';
import { makeTwitchFetcherParams } from './twitch.utils';
import {
  getBroadcasterFollowersTotal,
  getBroadcasterSubscribersTotal
} from './twitch.api';
import { APIError } from '@stats-station/models';

export const handleGetBroadcasterSubscribers = (c: Context) => {
  const broadcasterId = c.req.param('broadcasterId');
  const fetcherParams: ITwitchFetcherParams = makeTwitchFetcherParams(
    process.env.TEMP_TWITCH_USER_ACCESS_TOKEN
  );

  return getBroadcasterSubscribersTotal(broadcasterId, fetcherParams)
    .then((total) => c.json({ totalSubscriber: total }))
    .catch((err: APIError) => c.json(logError(err), err.status));
};

export const handleGetBroadcasterFollowers = (c: Context) => {
  const broadcasterId = c.req.param('broadcasterId');
  const fetcherParams: ITwitchFetcherParams = makeTwitchFetcherParams(
    process.env.TEMP_TWITCH_USER_ACCESS_TOKEN
  );

  return getBroadcasterFollowersTotal(broadcasterId, fetcherParams)
    .then((total) => c.json({ totalFollower: total }))
    .catch((err: APIError) => c.json(logError(err), err.status));
};
