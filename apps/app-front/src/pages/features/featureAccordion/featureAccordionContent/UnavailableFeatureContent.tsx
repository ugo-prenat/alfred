import { IFrontFeature } from '@alfred/models';
import { FC } from 'react';

interface IUnavailableFeatureContentProps {
  feature: IFrontFeature;
}

const UnavailableFeatureContent: FC<IUnavailableFeatureContentProps> = ({
  feature
}) => {
  const { text } = feature;

  return (
    <div className="flex justify-between p-6 pt-0">je suis indisponible</div>
  );
};

export default UnavailableFeatureContent;
