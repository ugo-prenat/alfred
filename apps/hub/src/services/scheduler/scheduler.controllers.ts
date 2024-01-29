import { Context, Env } from 'hono';
import { isValidScheduledFeatureName } from './scheduler.utils';

export const triggerFeature = (c: Context<Env, '/:featureName'>) => {
  const featureName = c.req.param('featureName');

  if (!isValidScheduledFeatureName(featureName))
    return c.json({ message: `invalid feature name ${featureName}` }, 400);

  // get all broadcasters
  // check is feature enabled
  // call makeMonthlyRecap

  return c.json({ featureName });
};
