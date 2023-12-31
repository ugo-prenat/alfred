import { FC, PropsWithChildren } from 'react';
import {
  TooltipProvider,
  Tooltip as ShadcnTooltip,
  TooltipTrigger,
  TooltipContent
} from './shadcn/tooltip';

const DEFAULT_TOOLTIP_DELAY_DURATION = 200;

interface ITooltipProps extends PropsWithChildren {
  text: string;
  className?: string;
  side?: 'left' | 'top' | 'right' | 'bottom';
  delay?: number;
}

const Tooltip: FC<ITooltipProps> = ({
  children,
  text,
  className,
  side,
  delay = DEFAULT_TOOLTIP_DELAY_DURATION
}) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <ShadcnTooltip>
        <TooltipTrigger className={className}>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{text}</p>
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
};

export default Tooltip;
