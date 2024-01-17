import {
  Feature,
  FeatureName,
  FeatureStatus,
  IAPIFeature,
  IDBBot,
  IDBFeature,
  IFeature,
  IFeatureConf,
  IFrontFeature,
  IRawFeature,
  ITwitchBroadcasterGoal,
  ITwitchFetcherParams
} from '@alfred/models';
import { makeTwitchFetcherParams } from '../twitch/twitch.utils';
import { getBroadcasterGoals } from '../twitch/twitch.api';
import { FEATURES_WHO_HAS_TO_BE_ACTIVATED_ON_TWITCH } from '@alfred/constants';
import {
  handleGetBroadcasterById,
  makeAPIBroadcasterToBroadcaster
} from '../broadcasters/broadcasters.utils';

export const makeRawFeature = (
  { type, name, defaultStatus, availability }: IFeatureConf,
  broadcasterBot: IDBBot
): IRawFeature => {
  const featureBase: Omit<IRawFeature, 'type'> = {
    name,
    availability,
    botId: broadcasterBot._id,
    text: `Alfred ${name} feature`,
    status: broadcasterBot.status !== 'active' ? 'unavailable' : defaultStatus
  };

  switch (type) {
    case 'eventSub':
      return { ...featureBase, type, featureActivatedOnTwitch: false };
    case 'recurring':
      return { ...featureBase, type, cron: '0 0 * * *' };
    case 'manual':
      return { ...featureBase, type };
  }
};

export const makeAPIFeatureToFeature = (feature: IAPIFeature): IFeature => {
  const { _id, ...rest } = feature.toObject();
  return { id: _id.toString(), ...rest };
};

export const makeAPIFeaturesToFeatures = (
  features: IAPIFeature[]
): IFeature[] => features.map(makeAPIFeatureToFeature);

export const makeAPIFeatureToFrontFeature = (
  feature: IAPIFeature
): IFrontFeature => {
  const { _id, createdAt, updatedAt, ...rest } = feature.toObject();
  return rest;
};

export const makeDbFeatureToFrontFeature = (
  feature: IDBFeature
): IFrontFeature => {
  const { _id, createdAt, updatedAt, ...rest } = feature;
  return rest;
};

export const handleGetBroacasterFeatures = (
  availableFeaturesConf: IFeatureConf[],
  broadcasterFeatures: IAPIFeature[],
  broadcasterBot: IDBBot,
  broadcasterId: string
): Promise<IDBFeature>[] =>
  availableFeaturesConf.map(async (featureConf) => {
    const feature: IDBFeature = await findOrCreateBroadcasterFeature(
      featureConf,
      broadcasterFeatures,
      broadcasterBot
    );
    const featureHasToBeActivatedOnTwitch =
      checkIfFeatureHasToBeActivatedOnTwitch(feature);

    if (featureHasToBeActivatedOnTwitch) {
      const featureActivatedOnTwitch = await checkIsFeatureActivatedOnTwitch(
        broadcasterId,
        feature.name
      );

      const status: FeatureStatus = featureActivatedOnTwitch
        ? 'enabled'
        : 'unavailable';

      return { ...feature, featureActivatedOnTwitch, status };
    }

    return feature;
  });

export const findOrCreateBroadcasterFeature = async (
  featureConf: IFeatureConf,
  broadcasterFeatures: IAPIFeature[],
  broadcasterBot: IDBBot
): Promise<IDBFeature> => {
  const maybeFeature: IDBFeature | undefined = broadcasterFeatures
    .find((f) => f.get('name') === featureConf.name)
    ?.toObject();

  if (maybeFeature)
    return {
      ...maybeFeature,
      status:
        broadcasterBot.status !== 'active' ? 'unavailable' : maybeFeature.status
    };

  const newFeature: IDBFeature = (
    await Feature.create(makeRawFeature(featureConf, broadcasterBot))
  ).toObject();
  return newFeature;
};

export const checkIsFeatureActivatedOnTwitch = async (
  broadcasterId: string,
  featureName: FeatureName
): Promise<boolean> => {
  const broadcaster = await handleGetBroadcasterById(broadcasterId).then(
    makeAPIBroadcasterToBroadcaster
  );

  const fetcherParams: ITwitchFetcherParams = makeTwitchFetcherParams(
    broadcaster.twitchToken
  );
  const broadcasterGoals: ITwitchBroadcasterGoal[] = (
    await getBroadcasterGoals(broadcaster.twitchId, fetcherParams)
  ).data;

  const goalTargetType: string | undefined =
    FEATURES_WHO_HAS_TO_BE_ACTIVATED_ON_TWITCH[featureName];

  return broadcasterGoals.some((goal) => goal.type === goalTargetType);
};

const checkIfFeatureHasToBeActivatedOnTwitch = (
  feature: IDBFeature
): boolean => {
  const featureWhoHasToBeActivatedOnTwitch = Object.keys(
    FEATURES_WHO_HAS_TO_BE_ACTIVATED_ON_TWITCH
  );
  return (
    featureWhoHasToBeActivatedOnTwitch.includes(feature.name) &&
    feature.status === 'enabled'
  );
};
