import { FC, PropsWithChildren } from 'react';

export const H1: FC<PropsWithChildren> = ({ children }) => (
  <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
    {children}
  </h1>
);

export const P: FC<PropsWithChildren> = ({ children }) => (
  <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
);

export const Muted: FC<PropsWithChildren> = ({ children }) => (
  <p className="text-sm text-muted-foreground">{children}</p>
);
