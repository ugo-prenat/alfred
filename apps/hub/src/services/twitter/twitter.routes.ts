import { Hono } from 'hono';
import { handleCreateTweet } from './twitter.controllers';
import { checkAuth } from '@/utils/auth.utils';

const twitterRoute = new Hono();

twitterRoute.post('/tweet', checkAuth, handleCreateTweet);

export default twitterRoute;
