import { IFrontBroadcaster } from '@alfred/models';
import { AccordionItem } from '@components/ui/shadcn/accordion';
import { FC } from 'react';
import BroadcasterAccordionTrigger from './BroadcasterAccordionTrigger';
import BroadcasterAccordionContent from './BroadcasterAccordionContent';

interface IBroadcasterProps {
  broadcaster: IFrontBroadcaster;
}

const BroadcasterAccordion: FC<IBroadcasterProps> = ({ broadcaster }) => (
  <AccordionItem value={broadcaster.id} className="border-none">
    <BroadcasterAccordionTrigger broadcaster={broadcaster} />
    <BroadcasterAccordionContent broadcaster={broadcaster} />
  </AccordionItem>
);

export default BroadcasterAccordion;
