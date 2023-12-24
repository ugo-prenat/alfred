import {
  APIError,
  IAPITweet,
  ICreateTweetPayload,
  Tweet
} from '@alfred/models';
import { Context } from 'hono';
import { logError } from '@/utils/logger.utils';
import { createTweet } from './twitter.utils';
import { IJwtPayload } from '@alfred/utils';

export const handleCreateTweet = (c: Context) => {
  const payload: ICreateTweetPayload = { text: 'Alfred 👴' };
  const jwt: IJwtPayload = c.get('jwt');

  return createTweet(payload, jwt.sub)
    .then((res) => c.json(res))
    .catch((err: APIError) => c.json(logError(err), err.status));
};

export const handleDeleteTweet = (c: Context) => {
  const tweetId = c.req.param('tweetId');

  return Tweet.findOneAndDelete({ tweetId })
    .then((res: IAPITweet | null) =>
      res ? c.body(null, 204) : c.json({ error: 'tweet not found' }, 500)
    )
    .catch((err) => c.json(logError(err), err.status));
};
