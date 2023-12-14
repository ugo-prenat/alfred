import { APIError, ICreateTweetPayload } from '@stats-station/models';
import { logError } from '@stats-station/utils';
import { Context } from 'hono';
import { createTweet } from './twitter.api';

export const handleCreateTweet = (c: Context) => {
  const payload: ICreateTweetPayload = { text: 'station 🚂' };

  return createTweet(payload)
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};
