import { FC } from 'react';
import { IFrontFeature } from '@alfred/models';
import { AccordionTrigger } from '@components/ui/shadcn/accordion';
import FeatureStatus from './FeatureStatus';

interface IFeatureAccordionTriggerProps {
  feature: IFrontFeature;
}

const FeatureAccordionTrigger: FC<IFeatureAccordionTriggerProps> = ({
  feature
}) => {
  const { name, status } = feature;

  return (
    <AccordionTrigger className="p-6">
      <div className="flex flex-1 justify-between pr-4">
        <p>{name}</p>
        <FeatureStatus status={status} />
      </div>
    </AccordionTrigger>
  );
};

export default FeatureAccordionTrigger;
