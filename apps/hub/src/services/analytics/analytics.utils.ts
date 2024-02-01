import {
  Analytics,
  IAPIAnalytics,
  IAPIFeature,
  IChannelSummary,
  IRawAnalytics,
  IRawChannelSummary
} from '@alfred/models';
import {
  getBroadcaster,
  makeAPIBroadcasterToBroadcaster
} from '../broadcasters/broadcasters.utils';
import { logError, logger } from '@/utils/logger.utils';
import { ensureError, isEmpty } from '@alfred/utils';
import { getBroadcasterMonthlyRecap } from './analytics.api';
import { Types } from 'mongoose';
import {
  createTweet,
  makeMonthlyRecapTweetText
} from '../twitter/twitter.utils';

interface IMakeMonthlyRecapReturnProps {
  aborted: boolean;
  completed: boolean;
}

export const makeMonthlyRecap = async (
  feature: IAPIFeature
): Promise<IMakeMonthlyRecapReturnProps> => {
  try {
    const broadcaster = await getBroadcaster({
      botId: feature.get('botId')
    }).then(makeAPIBroadcasterToBroadcaster);
    const monthlyRecap = await getBroadcasterMonthlyRecap(
      broadcaster.username
    ).then(makeRawChannelSummaryToChannelSummary);

    if (isEmpty(monthlyRecap)) {
      logger.warn(
        `empty monthly recap for broadcaster ${broadcaster.username}`
      );
      return { completed: false, aborted: true };
    }

    await createAnalytics(
      makeMonthlyRecapRawAnalytics(monthlyRecap, broadcaster.botId)
    );

    const tweetText: string = makeMonthlyRecapTweetText(monthlyRecap);
    await createTweet(
      { text: tweetText },
      broadcaster.id,
      broadcaster.botId.toString(),
      'monthly-recap'
    );

    return { completed: true, aborted: false };
  } catch (err) {
    logError(ensureError(err));
    return { completed: false, aborted: true };
  }
};

export const makeMonthlyRecapRawAnalytics = (
  recap: IChannelSummary,
  botId: Types.ObjectId
): IRawAnalytics => ({
  botId,
  feature: 'monthly-recap',
  ...recap
});

export const createAnalytics = (
  analytic: IRawAnalytics
): Promise<IAPIAnalytics> => Analytics.create(analytic);

export const makeRawChannelSummaryToChannelSummary = ({
  rank,
  minutes_streamed,
  avg_viewers,
  max_viewers,
  hours_watched,
  followers,
  followers_total
}: IRawChannelSummary): IChannelSummary => ({
  rank,
  minutesStreamed: minutes_streamed,
  avgViewers: avg_viewers,
  maxViewers: max_viewers,
  hoursWatched: hours_watched,
  followers,
  followersTotal: followers_total
});
