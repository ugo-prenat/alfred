import { FC } from 'react';
import { FeatureName } from '@alfred/models';
import { AccordionContent } from '@components/ui/shadcn/accordion';
import UnavailableFeatureContent from './UnavailableFeatureContent';
import ComingSoonFeatureContent from './ComingSoonFeatureContent';
import { FrontFeatureStatus } from '@pages/features/features.models';
import EnabledFeatureContent from './EnabledFeatureContent';
import DisabledFeatureContent from './DisabledFeatureContent';
import { useFeature } from '@pages/features/features.hooks';

interface IFeatureAccordionContentProps {
  featureName: FeatureName;
}

const FeatureAccordionContent: FC<IFeatureAccordionContentProps> = ({
  featureName
}) => {
  const { status, availability } = useFeature(featureName);
  const featureStatus: FrontFeatureStatus =
    availability === 'coming-soon' ? 'coming-soon' : status;

  const Content = () => {
    switch (featureStatus) {
      case 'enabled':
        return <EnabledFeatureContent {...{ featureName }} />;
      case 'unavailable':
        return <UnavailableFeatureContent {...{ featureName }} />;
      case 'coming-soon':
        return <ComingSoonFeatureContent {...{ featureName }} />;
      case 'disabled':
        return <DisabledFeatureContent {...{ featureName }} />;
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
