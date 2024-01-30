import { Context, Env } from 'hono';
import {
  getAllEnabledFeaturesByName,
  isValidScheduledFeatureName
} from './scheduler.utils';
import { APIError, FeatureName } from '@alfred/models';
import { logError, logger } from '@/utils/logger.utils';
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

    const promisesRecaps = features.map(makeMonthlyRecap);
    const recaps = await Promise.all(promisesRecaps);

    const triggerFeatureSummary = {
      message: `all enabled ${featureName} features was triggered`,
      total: recaps.length,
      aborted: recaps.filter((p) => p.aborted).length,
      completed: recaps.filter((p) => p.completed).length
    };

    logger.info(triggerFeatureSummary);
    return c.json(triggerFeatureSummary);
  } catch (err) {
    if (err instanceof APIError) return c.json(logError(err), err.status);
    return c.json(logError(ensureError(err)), 500);
  }
};
