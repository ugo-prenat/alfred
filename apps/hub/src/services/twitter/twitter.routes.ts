import { Hono } from 'hono';
import { getTwitter } from './twitter.controllers';

const twitterRoute = new Hono();

twitterRoute.get('/', getTwitter);

export default twitterRoute;
