import { FC } from 'react';
import { FeatureName } from '@alfred/models';
import { AccordionItem } from '@components/ui/shadcn/accordion';
import FeatureAccordionTrigger from './FeatureAccordionTrigger';
import FeatureAccordionContent from './featureAccordionContent/FeatureAccordionContent';

interface IFeatureProps {
  featureName: FeatureName;
}

const Feature: FC<IFeatureProps> = ({ featureName }) => {
  return (
    <AccordionItem value={featureName}>
      <FeatureAccordionTrigger featureName={featureName} />
      <FeatureAccordionContent featureName={featureName} />
    </AccordionItem>
  );
};

export default Feature;
