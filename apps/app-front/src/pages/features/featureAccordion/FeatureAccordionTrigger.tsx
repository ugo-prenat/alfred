import { FC } from 'react';
import { BarChart3, Clapperboard, Flag, Unplug, Users } from 'lucide-react';
import { FeatureName, IFrontFeature } from '@alfred/models';
import { AccordionTrigger } from '@components/ui/shadcn/accordion';
import FeatureStatus from './FeatureStatus';
import { useTranslation } from '@services/i18n/useTranslation';
import { cn } from '@utils/tailwind.utils';

interface IFeatureAccordionTriggerProps {
  feature: IFrontFeature;
}

const FeatureAccordionTrigger: FC<IFeatureAccordionTriggerProps> = ({
  feature
}) => {
  const t = useTranslation();
  const { name, status } = feature;

  return (
    <AccordionTrigger className="p-6">
      <div className="flex flex-1 justify-between pr-4">
        <div
          className={cn('flex items-center gap-3', {
            'opacity-40': status === 'disabled'
          })}
        >
          <FeatureIcon name={name} />
          <p>{t(`features.name.${name}`)}</p>
        </div>
        <FeatureStatus feature={feature} />
      </div>
    </AccordionTrigger>
  );
};

const FeatureIcon: FC<{ name: FeatureName }> = ({ name }) => {
  const className = 'w-5 h-5';
  switch (name) {
    case 'stream-up':
      return <Flag className={className} />;
    case 'stream-down':
      return <Unplug className={className} />;
    case 'subscribers-goal-end':
      return <Users className={className} />;
    case 'followers-goal-end':
      return <Users className={className} />;
    case 'weekly-most-popular-clip':
      return <Clapperboard className={className} />;
    case 'monthly-recap':
      return <BarChart3 className={className} />;
    default:
      return <Flag className={className} />;
  }
};

export default FeatureAccordionTrigger;
