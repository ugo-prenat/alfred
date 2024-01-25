import { FC } from 'react';
import { FeatureName } from '@alfred/models';
import { AccordionItem } from '@components/ui/shadcn/accordion';
import FeatureAccordionTrigger from './FeatureAccordionTrigger';
import FeatureAccordionContent from './featureAccordionContent/FeatureAccordionContent';

interface IFeatureAccordionProps {
  featureName: FeatureName;
}

const FeatureAccordion: FC<IFeatureAccordionProps> = ({ featureName }) => {
  return (
    <AccordionItem value={featureName}>
      <FeatureAccordionTrigger featureName={featureName} />
      <FeatureAccordionContent featureName={featureName} />
    </AccordionItem>
  );
};

export default FeatureAccordion;
