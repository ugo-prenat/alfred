import { Hono } from 'hono';
import { triggerFeature } from './scheduler.controllers';

const schedulerRoute = new Hono();

schedulerRoute.get('/:featureName', triggerFeature);

export default schedulerRoute;
