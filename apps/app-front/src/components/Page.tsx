import { cn } from '@utils/tailwind.utils';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import ToggleMenuBtn from './nav/ToggleMenuBtn';

interface IPageProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {}

const Page: FC<IPageProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('w-full h-full p-6', className)} {...props}>
      <ToggleMenuBtn />
      {children}
    </div>
  );
};

export default Page;
