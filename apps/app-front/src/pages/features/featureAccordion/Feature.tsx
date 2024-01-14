import { FC } from 'react';
import { IFrontFeature } from '@alfred/models';
import { AccordionItem } from '@components/ui/shadcn/accordion';
import FeatureAccordionTrigger from './FeatureAccordionTrigger';
import FeatureAccordionContent from './featureAccordionContent/FeatureAccordionContent';

interface IFeatureProps {
  feature: IFrontFeature;
}

const Feature: FC<IFeatureProps> = ({ feature }) => {
  return (
    <AccordionItem value={feature.name}>
      <FeatureAccordionTrigger feature={feature} />
      <FeatureAccordionContent feature={feature} />
    </AccordionItem>
  );
};

export default Feature;
