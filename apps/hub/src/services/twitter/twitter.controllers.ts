import { IAPITweet, Tweet } from '@alfred/models';
import { Context } from 'hono';
import { logError } from '@/utils/logger.utils';

export const handleDeleteTweet = (c: Context) => {
  const tweetId = c.req.param('tweetId');

  return Tweet.findOneAndDelete({ tweetId })
    .then((res: IAPITweet | null) =>
      res ? c.body(null, 204) : c.json({ error: 'tweet not found' }, 500)
    )
    .catch((err) => c.json(logError(err), err.status));
};
