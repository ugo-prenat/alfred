import { cn } from '@utils/tailwind.utils';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { Title } from './ui/Typography';
import BreadCrumb from './breadcrumb/Breadcrumb';

interface IPageProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  title?: string;
  showBreadcrumb?: boolean;
}

const Page: FC<IPageProps> = ({
  title,
  showBreadcrumb = false,
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('w-full h-full p-10', className)} {...props}>
      {showBreadcrumb && <BreadCrumb />}
      {title && <Title className="mb-6">{title}</Title>}
      {children}
    </div>
  );
};

export default Page;
