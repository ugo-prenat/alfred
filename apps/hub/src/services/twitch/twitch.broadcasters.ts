import { logError } from '@stats-station/utils';
import { Context } from 'hono';
import {
  getBroadcasterFollowersTotal,
  getBroadcasterSubscribersTotal
} from './twitch.api';
import { APIError } from '@stats-station/models';

export const handleGetBroadcasterSubscribers = (c: Context) => {
  const broadcasterId = c.req.param('broadcasterId');

  return getBroadcasterSubscribersTotal(broadcasterId)
    .then((total) => c.json({ totalSubscriber: total }))
    .catch((err: APIError) => c.json(logError(err), err.status));
};

export const handleGetBroadcasterFollowers = (c: Context) => {
  const broadcasterId = c.req.param('broadcasterId');

  return getBroadcasterFollowersTotal(broadcasterId)
    .then((total) => c.json({ totalFollower: total }))
    .catch((err: APIError) => c.json(logError(err), err.status));
};
