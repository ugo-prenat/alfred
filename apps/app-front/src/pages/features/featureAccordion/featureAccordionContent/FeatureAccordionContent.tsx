import { FC } from 'react';
import { FeatureName } from '@alfred/models';
import { AccordionContent } from '@components/ui/shadcn/accordion';
import UnavailableFeatureContent from './UnavailableFeatureContent';
import ComingSoonFeatureContent from './ComingSoonFeatureContent';
import { FrontFeatureStatus } from '@pages/features/features.models';
import EnabledFeatureContent from './EnabledFeatureContent';
import DisabledFeatureContent from './DisabledFeatureContent';
import { useFeature } from '@pages/features/features.hooks';
import { useAuthStore } from '@services/state/auth/auth.stores';

interface IFeatureAccordionContentProps {
  featureName: FeatureName;
}

const FeatureAccordionContent: FC<IFeatureAccordionContentProps> = ({
  featureName
}) => {
  const { status, availability } = useFeature(featureName);
  const { broadcaster, bot } = useAuthStore();
  const isBotLinked = !!broadcaster && !!bot && bot.status === 'active';
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
      {isBotLinked ? (
        <Content />
      ) : (
        <UnavailableFeatureContent featureName={featureName} botIsNotLinked />
      )}
    </AccordionContent>
  );
};

export default FeatureAccordionContent;
