import { Hono } from 'hono';
import { handleDeleteTweet } from './twitter.controllers';
import { basicAuth } from '@/utils/auth.utils';

const twitterRoute = new Hono();

twitterRoute.use('/*', basicAuth);

twitterRoute.delete('/tweets/:tweetId', handleDeleteTweet);

export default twitterRoute;
