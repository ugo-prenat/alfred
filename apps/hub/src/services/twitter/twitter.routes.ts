import { Hono } from 'hono';
import { handleCreateTweet } from './twitter.controllers';

const twitterRoute = new Hono();

twitterRoute.post('/tweet', handleCreateTweet);

export default twitterRoute;
