import { Context } from 'hono';

export const getTwitter = (c: Context) => c.json({ message: 'GET /twitter' });
