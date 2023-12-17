import { APIError, ICreateTweetPayload } from '@stats-station/models';
import { Context } from 'hono';
import { createTweet } from './twitter.api';
import { logError } from '@/utils/logger.utils';

export const handleCreateTweet = (c: Context) => {
  const payload: ICreateTweetPayload = { text: 'station 🚂' };

  return createTweet(payload)
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};
