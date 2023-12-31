import { FC, ReactNode } from 'react';
import { Sheet as ShadcnSheet, SheetClose, SheetContent } from './shadcn/sheet';
import { Link } from '@tanstack/react-router';

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
      <SheetClose>
        <a href="/admin">oui</a>
      </SheetClose>
      <SheetClose>
        <Link to="/admin" onClick={(e) => e.preventDefault()}>
          hein ?
        </Link>
      </SheetClose>
      {content}
    </SheetContent>
  </ShadcnSheet>
);

export default Sheet;
