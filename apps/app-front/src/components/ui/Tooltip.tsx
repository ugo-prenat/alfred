import { FC, PropsWithChildren } from 'react';
import {
  TooltipProvider,
  Tooltip as ShadcnTooltip,
  TooltipTrigger,
  TooltipContent
} from './shadcn/tooltip';

interface ITooltipProps extends PropsWithChildren {
  text: string;
}

const Tooltip: FC<ITooltipProps> = ({ children, text }) => {
  return (
    <TooltipProvider>
      <ShadcnTooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
};

export default Tooltip;
