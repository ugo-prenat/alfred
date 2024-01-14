import { FC } from 'react';
import { IFrontFeature } from '@alfred/models';
import { AccordionContent } from '@components/ui/shadcn/accordion';
import UnavailableFeatureContent from './UnavailableFeatureContent';
import ComingSoonFeatureContent from './ComingSoonFeatureContent';
import { FrontFeatureStatus } from '@pages/features/features.models';
import EnabledFeatureContent from './EnabledFeatureContent';
import DisabledFeatureContent from './DisabledFeatureContent';

interface IFeatureAccordionContentProps {
  feature: IFrontFeature;
}

const FeatureAccordionContent: FC<IFeatureAccordionContentProps> = ({
  feature
}) => {
  const { status, availability } = feature;
  const featureStatus: FrontFeatureStatus =
    availability === 'coming-soon' ? 'coming-soon' : status;

  const Content = () => {
    switch (featureStatus) {
      case 'enabled':
        return <EnabledFeatureContent {...{ feature }} />;
      case 'unavailable':
        return <UnavailableFeatureContent {...{ feature }} />;
      case 'coming-soon':
        return <ComingSoonFeatureContent {...{ feature }} />;
      case 'disabled':
        return <DisabledFeatureContent {...{ feature }} />;
      default:
        return null;
    }
  };

  return (
    <AccordionContent className="p-6 pt-0">
      <Content />
    </AccordionContent>
  );
};

export default FeatureAccordionContent;
