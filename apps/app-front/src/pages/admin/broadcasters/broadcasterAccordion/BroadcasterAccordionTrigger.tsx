import { IFrontBroadcaster } from '@alfred/models';
import { AccordionTrigger } from '@components/ui/shadcn/accordion';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@components/ui/shadcn/avatar';
import { FC } from 'react';

interface IBroadcasterAccordionTriggerProps {
  broadcaster: IFrontBroadcaster;
}

const BroadcasterAccordionTrigger: FC<IBroadcasterAccordionTriggerProps> = ({
  broadcaster
}) => {
  const { name, profileImgUrl, role } = broadcaster;

  return (
    <AccordionTrigger className="p-4">
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={profileImgUrl} />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <p className="text-lg">{name}</p>
        <p className="text-muted-foreground/60 font-light text-sm ml-4">
          {role}
        </p>
      </div>
    </AccordionTrigger>
  );
};

export default BroadcasterAccordionTrigger;
