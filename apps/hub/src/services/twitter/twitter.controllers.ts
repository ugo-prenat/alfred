import { APIError, ICreateTweetPayload } from '@alfred/models';
import { Context } from 'hono';
import { logError } from '@/utils/logger.utils';
import { createTweet } from './twitter.utils';
import { IJwtPayload } from '@alfred/utils';

export const handleCreateTweet = (c: Context) => {
  const payload: ICreateTweetPayload = { text: 'station 🚂' };
  const jwt: IJwtPayload = c.get('jwtPayload');

  return createTweet(payload, jwt.sub)
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};
