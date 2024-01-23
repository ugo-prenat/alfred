import { FC } from 'react';
import { IFrontBroadcaster } from '@alfred/models';
import { AccordionContent } from '@components/ui/shadcn/accordion';

interface IBroadcasterAccordionContentProps {
  broadcaster: IFrontBroadcaster;
}

const BroadcasterAccordionContent: FC<
  IBroadcasterAccordionContentProps
> = ({}) => {
  return (
    <AccordionContent className="p-4 pt-0">
      <p>todo:</p>
      <p>change role</p>
      <p>enable/disable twitch eventsub subscriptions</p>
      <p>manage broadcaster features</p>
      <p>bot data</p>
      <p>link to /admin/tweets page</p>
    </AccordionContent>
  );
};

export default BroadcasterAccordionContent;
