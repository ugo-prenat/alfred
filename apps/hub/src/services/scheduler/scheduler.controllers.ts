import { Context, Env } from 'hono';
import {
  getAllEnabledFeaturesByName,
  isValidScheduledFeatureName
} from './scheduler.utils';
import { APIError, FeatureName } from '@alfred/models';
import { logError } from '@/utils/logger.utils';
import { ensureError } from '@alfred/utils';
import { makeMonthlyRecap } from '../analytics/analytics.utils';

export const triggerFeature = async (c: Context<Env, '/:featureName'>) => {
  const featureName = c.req.param('featureName');

  if (!isValidScheduledFeatureName(featureName))
    return c.json({ message: `invalid feature name ${featureName}` }, 400);

  try {
    const features = await getAllEnabledFeaturesByName(
      featureName as FeatureName
    );

    const promisesRecap = features.map(makeMonthlyRecap);
    await Promise.all(promisesRecap);

    return c.json({
      message: `all enabled ${featureName} features was triggered`
    });
  } catch (err) {
    if (err instanceof APIError) return c.json(logError(err), err.status);
    return c.json(logError(ensureError(err)), 500);
  }

  return c.json({ featureName });
};
