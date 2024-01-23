import { IFrontBroadcaster } from '@alfred/models';
import { Accordion } from '@components/ui/shadcn/accordion';
import { FC } from 'react';
import BroadcasterAccordion from './broadcasterAccordion/BroadcasterAccordion';

interface IBroadcastersListProps {
  broadcasters: IFrontBroadcaster[];
}

const BroadcastersList: FC<IBroadcastersListProps> = ({ broadcasters }) => {
  return (
    <Accordion type="single" collapsible className="border rounded-md">
      {broadcasters.map((broadcaster) => (
        <BroadcasterAccordion broadcaster={broadcaster} key={broadcaster.id} />
      ))}
    </Accordion>
  );
};

export default BroadcastersList;
