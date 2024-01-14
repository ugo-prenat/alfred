import { IFrontFeature } from '@alfred/models';
import { Button } from '@components/ui/shadcn/button';
import { useUpdateFeature } from '@pages/features/features.hooks';
import { FC } from 'react';

interface IDisabledFeatureContentProps {
  feature: IFrontFeature;
}

const DisabledFeatureContent: FC<IDisabledFeatureContentProps> = ({
  feature
}) => {
  const { name } = feature;
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
