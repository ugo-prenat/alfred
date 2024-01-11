import { IFrontFeature } from '@alfred/models';
import { FC } from 'react';
import Feature from './featureAccordion/Feature';
import { Accordion } from '@components/ui/shadcn/accordion';

interface IFeaturesListProps {
  features: IFrontFeature[];
}

const FeaturesList: FC<IFeaturesListProps> = ({ features }) => {
  return (
    <Accordion type="single" collapsible className="border rounded-md">
      {features.map((feature) => (
        <Feature key={feature.name} feature={feature} />
      ))}
    </Accordion>
  );
};

export default FeaturesList;
