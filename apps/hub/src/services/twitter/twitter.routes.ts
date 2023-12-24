import { Hono } from 'hono';
import { handleCreateTweet, handleDeleteTweet } from './twitter.controllers';
import { checkAuth } from '@/utils/auth.utils';

const twitterRoute = new Hono();

twitterRoute.use('/*', checkAuth);

twitterRoute.post('/tweets', handleCreateTweet);
twitterRoute.delete('/tweets/:tweetId', handleDeleteTweet);

export default twitterRoute;
