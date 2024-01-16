import { FC } from 'react';
import { FeatureName } from '@alfred/models';

interface IUnavailableFeatureContentProps {
  featureName: FeatureName;
  botIsNotLinked?: boolean;
}

const UnavailableFeatureContent: FC<IUnavailableFeatureContentProps> = ({
  botIsNotLinked = false
}) => {
  return (
    <div className="flex flex-col p-6 pt-0">
      <p>je suis indisponible</p>
      <p>
        cause :{' '}
        {botIsNotLinked ? "le bot n'est pas configuré" : 'feature coming-soon'}
      </p>
    </div>
  );
};

export default UnavailableFeatureContent;
