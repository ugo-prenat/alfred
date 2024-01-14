import { FC } from 'react';
import { FeatureName } from '@alfred/models';
import { useFeature } from '@pages/features/features.hooks';
import { useTranslation } from '@services/i18n/useTranslation';

interface IComingSoonFeatureContentProps {
  featureName: FeatureName;
}

const ComingSoonFeatureContent: FC<IComingSoonFeatureContentProps> = ({
  featureName
}) => {
  const { name } = useFeature(featureName);
  const t = useTranslation();

  return (
    <div className="flex flex-col p-6 pt-0">
      je suis bientôt disponible
      <p>{t(`features.${name}.description`)}</p>
    </div>
  );
};

export default ComingSoonFeatureContent;
