import { IFrontFeature } from '@alfred/models';
import { useTranslation } from '@services/i18n/useTranslation';
import { FC } from 'react';

interface IComingSoonFeatureContentProps {
  feature: IFrontFeature;
}

const ComingSoonFeatureContent: FC<IComingSoonFeatureContentProps> = ({
  feature
}) => {
  const { name } = feature;
  const t = useTranslation();

  return (
    <div className="flex flex-col p-6 pt-0">
      je suis bientôt disponible
      <p>{t(`features.${name}.description`)}</p>
    </div>
  );
};

export default ComingSoonFeatureContent;
