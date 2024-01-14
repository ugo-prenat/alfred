import { IFrontFeature } from '@alfred/models';
import { FC } from 'react';

interface IComingSoonFeatureContentProps {
  feature: IFrontFeature;
}

const ComingSoonFeatureContent: FC<IComingSoonFeatureContentProps> = ({
  feature
}) => {
  const { text } = feature;

  return (
    <div className="flex justify-between p-6 pt-0">
      je suis bientôt disponible
    </div>
  );
};

export default ComingSoonFeatureContent;
