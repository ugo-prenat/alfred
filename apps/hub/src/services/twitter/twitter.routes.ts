import { Hono } from 'hono';
import { handleCreateTweet, handleDeleteTweet } from './twitter.controllers';
import { basicAuth } from '@/utils/auth.utils';

const twitterRoute = new Hono();

twitterRoute.use('/*', basicAuth);

twitterRoute.post('/tweets', handleCreateTweet);
twitterRoute.delete('/tweets/:tweetId', handleDeleteTweet);

export default twitterRoute;
