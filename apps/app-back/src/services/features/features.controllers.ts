import { Feature } from '@alfred/models';
import { Context } from 'hono';

export const getFeatures = (c: Context) =>
  Feature.find()
    .then((features) => c.json(features))
    .catch((err) => c.json({ error: err.message }, 500));
