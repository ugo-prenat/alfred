import { IFrontFeature } from '@alfred/models';
import { Button } from '@components/ui/shadcn/button';
import { useUpdateFeature } from '@pages/features/features.hooks';
import { FC } from 'react';

interface IEnabledFeatureContentProps {
  feature: IFrontFeature;
}

const EnabledFeatureContent: FC<IEnabledFeatureContentProps> = ({
  feature
}) => {
  const { name } = feature;
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
