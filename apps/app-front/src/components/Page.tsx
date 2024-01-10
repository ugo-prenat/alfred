import { cn } from '@utils/tailwind.utils';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { Title } from './ui/Typography';

interface IPageProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const Page: FC<IPageProps> = ({ title, children, className, ...props }) => {
  return (
    <div className={cn('w-full h-full p-10', className)} {...props}>
      {title && <Title className="mb-6">{title}</Title>}
      {children}
    </div>
  );
};

export default Page;
