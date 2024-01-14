import { IFrontFeature } from '@alfred/models';
import { FC } from 'react';

interface IDisabledFeatureContentProps {
  feature: IFrontFeature;
}

const DisabledFeatureContent: FC<IDisabledFeatureContentProps> = ({
  feature
}) => {
  const { text } = feature;
  return <div className="flex justify-between p-6 pt-0">je suis désactivé</div>;
};

export default DisabledFeatureContent;
