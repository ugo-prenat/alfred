import { Context } from 'hono';

export const getTwitch = (c: Context) => c.json({ message: 'GET /twitch' });
