import { FC, ReactNode } from 'react';
import { Sheet as ShadcnSheet, SheetContent } from './shadcn/sheet';

interface ISheetProps {
  content: ReactNode;
  className?: string;
  open?: boolean;
  side?: 'left' | 'top' | 'right' | 'bottom';
  onOpenChange?: (open: boolean) => void;
}

const Sheet: FC<ISheetProps> = ({
  content,
  className,
  open,
  side,
  onOpenChange
}) => (
  <ShadcnSheet defaultOpen={open} onOpenChange={onOpenChange}>
    <SheetContent side={side} className={className}>
      {content}
    </SheetContent>
  </ShadcnSheet>
);

export default Sheet;
