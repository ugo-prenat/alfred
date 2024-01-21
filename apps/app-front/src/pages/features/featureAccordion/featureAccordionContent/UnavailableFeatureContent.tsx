import { FC } from 'react';
import { FeatureName } from '@alfred/models';
import { useFeature } from '@pages/features/features.hooks';

interface IUnavailableFeatureContentProps {
  featureName: FeatureName;
  botIsNotLinked?: boolean;
}

const UnavailableFeatureContent: FC<IUnavailableFeatureContentProps> = ({
  featureName,
  botIsNotLinked = false
}) => {
  const feature = useFeature(featureName);

  return (
    <div className="flex flex-col p-6 pt-0">
      <p>je suis indisponible</p>
      <p>
        cause :{' '}
        {botIsNotLinked
          ? "le bot n'est pas configuré"
          : feature.type === 'eventSub' && !feature.featureActivatedOnTwitch
            ? 'feature pas activé sur Twitch'
            : 'feature coming-soon'}
      </p>
    </div>
  );
};

export default UnavailableFeatureContent;
