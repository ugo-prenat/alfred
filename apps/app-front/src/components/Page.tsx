import { cn } from '@utils/tailwind.utils';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

interface IPageProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {}

const Page: FC<IPageProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('w-full h-full p-10', className)} {...props}>
      {children}
    </div>
  );
};

export default Page;
