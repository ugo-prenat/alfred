import { Hono } from 'hono';
import { getTwitchUser } from './twitch.controllers';

const twitchRoute = new Hono();

twitchRoute.get('/users/:twitchAccessToken', getTwitchUser);

export default twitchRoute;
