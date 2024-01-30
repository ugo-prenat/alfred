import { IAPIFeature } from '@alfred/models';
import { getBroadcaster } from '../broadcasters/broadcasters.utils';
import { logError, logger } from '@/utils/logger.utils';
import { ensureError, isEmpty } from '@alfred/utils';
import { getBroadcasterMonthlyRecap } from './analytics.api';

interface IMakeMonthlyRecapReturnProps {
  aborted: boolean;
  completed: boolean;
}

export const makeMonthlyRecap = async (
  feature: IAPIFeature
): Promise<IMakeMonthlyRecapReturnProps> => {
  try {
    const broadcaster = await getBroadcaster({ botId: feature.get('botId') });
    const monthlyRecap = await getBroadcasterMonthlyRecap(
      broadcaster.get('username')
    );

    if (isEmpty(monthlyRecap)) {
      logger.warn(
        `empty monthly recap for broadcaster ${broadcaster.get('username')}`
      );
      return { completed: false, aborted: true };
    }

    // save monthly recap in DB
    // create tweet

    return { completed: true, aborted: false };
  } catch (err) {
    logError(ensureError(err));
    return { completed: false, aborted: true };
  }
};
