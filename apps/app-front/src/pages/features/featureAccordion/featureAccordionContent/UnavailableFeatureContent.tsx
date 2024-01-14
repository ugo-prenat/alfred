import { FC } from 'react';
import { FeatureName } from '@alfred/models';
import { useFeature } from '@pages/features/features.hooks';

interface IUnavailableFeatureContentProps {
  featureName: FeatureName;
}

const UnavailableFeatureContent: FC<IUnavailableFeatureContentProps> = ({
  featureName
}) => {
  const { text } = useFeature(featureName);

  return (
    <div className="flex justify-between p-6 pt-0">je suis indisponible</div>
  );
};

export default UnavailableFeatureContent;
