import { FC } from 'react';
import { FeatureName } from '@alfred/models';
import { Button } from '@components/ui/shadcn/button';
import { useFeature, useUpdateFeature } from '@pages/features/features.hooks';

interface IDisabledFeatureContentProps {
  featureName: FeatureName;
}

const DisabledFeatureContent: FC<IDisabledFeatureContentProps> = ({
  featureName
}) => {
  const { name } = useFeature(featureName);
  const { handleUpdateFeature } = useUpdateFeature();

  const handleEnable = () =>
    handleUpdateFeature({ name, update: { status: 'enabled' } });

  return (
    <div className="flex justify-between p-6 pt-0">
      <p>je suis désactivé</p>
      <Button onClick={handleEnable}>enable</Button>
    </div>
  );
};

export default DisabledFeatureContent;
