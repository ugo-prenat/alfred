import { FC, ReactNode } from 'react';
import { Button, ButtonProps } from './shadcn/button';
import { cn } from '@utils/tailwind.utils';

interface IIconButtonProps extends ButtonProps {
  icon: ReactNode;
  href: string;
}

const IconLink: FC<IIconButtonProps> = ({
  icon,
  href,
  className,
  ...props
}) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button
        variant="outline"
        size="icon"
        className={cn('border-none w-8 h-8', className)}
        {...props}
      >
        <span className="flex items-center h-4 w-4 select-none">{icon}</span>
      </Button>
    </a>
  );
};

export default IconLink;
