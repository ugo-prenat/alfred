import Feature from './featureAccordion/Feature';
import { Accordion } from '@components/ui/shadcn/accordion';
import { useFeaturesStore } from './features.store';

const FeaturesList = () => {
  const { features } = useFeaturesStore();

  return (
    <Accordion type="single" collapsible className="border rounded-md">
      {features.map(({ name }) => (
        <Feature key={name} featureName={name} />
      ))}
    </Accordion>
  );
};

export default FeaturesList;
