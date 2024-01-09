import { Context } from 'hono';

export const getFeatures = (c: Context) =>
  c.json({ message: 'Hello features' });
