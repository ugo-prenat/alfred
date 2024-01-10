import { cn } from '@utils/tailwind.utils';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

export const H1: FC<PropsWithChildren> = ({ children }) => (
  <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
    {children}
  </h1>
);

export const Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h2
    className={cn('text-xl font-bold tracking-tight lg:text-2xl', className)}
    {...props}
  >
    {children}
  </h2>
);

export const Description: FC<PropsWithChildren> = ({ children }) => (
  <p className="text-sm text-muted-foreground/80">{children}</p>
);

export const P: FC<PropsWithChildren> = ({ children }) => (
  <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
);
