import { Hono } from 'hono';
import { createTweet, getTwitter } from './twitter.controllers';

const twitterRoute = new Hono();

twitterRoute.get('/', getTwitter);
twitterRoute.post('/tweet', createTweet);

export default twitterRoute;
