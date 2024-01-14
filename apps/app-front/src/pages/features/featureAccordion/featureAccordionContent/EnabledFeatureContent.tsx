import { IFrontFeature } from '@alfred/models';
import { FC } from 'react';

interface IEnabledFeatureContentProps {
  feature: IFrontFeature;
}

const EnabledFeatureContent: FC<IEnabledFeatureContentProps> = ({
  feature
}) => {
  const { text } = feature;

  return <div className="flex justify-between p-6 pt-0">je suis enabled</div>;
};

export default EnabledFeatureContent;
