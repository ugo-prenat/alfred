import { IFrontFeature } from '@alfred/models';
import { AccordionContent } from '@components/ui/shadcn/accordion';
import { FC } from 'react';

interface IFeatureAccordionContentProps {
  feature: IFrontFeature;
}

const FeatureAccordionContent: FC<IFeatureAccordionContentProps> = ({
  feature
}) => {
  const { text } = feature;

  return <AccordionContent className="p-6 pt-0">{text}</AccordionContent>;
};

export default FeatureAccordionContent;
