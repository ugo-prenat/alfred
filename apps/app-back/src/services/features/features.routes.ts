import { Hono } from 'hono';
import { getFeatures } from './features.controllers';

export const featuresRoute = new Hono();

featuresRoute.get('/', getFeatures);
