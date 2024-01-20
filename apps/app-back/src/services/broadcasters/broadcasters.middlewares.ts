import { MiddlewareHandler, Next } from 'hono';
import {
  handleGetFeatureBy,
  isFeatureNameValid,
  makeAPIFeatureToFeature
} from '../features/features.utils';
import { UPDATE_BROADCASTER_FEATURE_PATH } from './broadcasters.routes';
import { PayloadContext } from '@alfred/utils';
import { IUpdateFeaturePayload } from '../features/features.models';
import { handleGetBotBy } from '../bots/bots.utils';
import { FeatureName, IFeature } from '@alfred/models';

export const checkIfFeatureCanBeUpdated =
  (): MiddlewareHandler =>
  async (
    c: PayloadContext<
      IUpdateFeaturePayload,
      typeof UPDATE_BROADCASTER_FEATURE_PATH
    >,
    next: Next
  ) => {
    const { broadcasterId, featureName } = c.req.param();
    const updateBody = c.req.valid('json');

    if (!isFeatureNameValid(featureName))
      return c.json({ message: `invalid feature name ${featureName}` }, 400);

    const broadcasterBot = (await handleGetBotBy({ broadcasterId })).toObject();

    const featureToUpdate: IFeature = await handleGetFeatureBy({
      botId: broadcasterBot._id,
      name: featureName as FeatureName
    }).then(makeAPIFeatureToFeature);

    if (featureToUpdate.availability !== 'active')
      return c.json(
        {
          message: `feature ${featureName} cannot be update, availability: ${featureToUpdate.availability}`
        },
        400
      );

    if (
      featureToUpdate.status === 'unavailable' ||
      (featureToUpdate.status !== 'enabled' && updateBody.status !== 'enabled')
    )
      return c.json(
        {
          message: `feature ${featureName} cannot be update, status: ${featureToUpdate.status}`
        },
        400
      );

    if (updateBody.subscriptionId)
      return c.json({ message: `invalid update body` }, 400);

    return await next();
  };
