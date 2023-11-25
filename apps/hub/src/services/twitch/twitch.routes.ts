import { Hono } from 'hono';
import { getTwitch } from './twitch.controllers';

const twitchRoute = new Hono();

twitchRoute.get('/', getTwitch);

export default twitchRoute;
