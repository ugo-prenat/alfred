import { FC } from 'react';
import { FeatureName } from '@alfred/models';
import { Button } from '@components/ui/shadcn/button';
import { useFeature, useUpdateFeature } from '@pages/features/features.hooks';

interface IEnabledFeatureContentProps {
  featureName: FeatureName;
}

const EnabledFeatureContent: FC<IEnabledFeatureContentProps> = ({
  featureName
}) => {
  const { name } = useFeature(featureName);
  const { handleUpdateFeature } = useUpdateFeature();

  const handleDisable = () =>
    handleUpdateFeature({ name, update: { status: 'disabled' } });

  return (
    <div className="flex justify-between p-6 pt-0">
      <p>je suis enabled</p>
      <Button variant="destructive" onClick={handleDisable}>
        disable
      </Button>
    </div>
  );
};

export default EnabledFeatureContent;
