import { FC } from 'react';
import { FeatureName } from '@alfred/models';
import { useFeature, useUpdateFeature } from '@pages/features/features.hooks';
import MeatballsMenu, {
  IMeatballsMenuItem
} from '@components/ui/MeatballsMenu';
import { useTranslation } from '@services/i18n/useTranslation';
import { Unplug } from 'lucide-react';

interface IEnabledFeatureContentProps {
  featureName: FeatureName;
}

const EnabledFeatureContent: FC<IEnabledFeatureContentProps> = ({
  featureName
}) => {
  const t = useTranslation();
  const { name } = useFeature(featureName);
  const { handleUpdateFeature } = useUpdateFeature();

  const handleDisable = () =>
    handleUpdateFeature({ name, update: { status: 'disabled' } });

  const menuItems: IMeatballsMenuItem[] = [
    {
      label: t('features.disable'),
      icon: <Unplug className="mr-2 h-4 w-4" />,
      onClick: handleDisable,
      className: 'text-destructive'
    }
  ];

  return (
    <div className="flex justify-between p-6 pt-0">
      <p>je suis enabled</p>

      <MeatballsMenu items={menuItems} />
    </div>
  );
};

export default EnabledFeatureContent;
