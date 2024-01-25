import { FC, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './shadcn/dropdown-menu';
import { Button } from './shadcn/button';
import { MoreHorizontal } from 'lucide-react';

export interface IMeatballsMenuItem {
  label: string;
  onClick: () => void;
  icon?: JSX.Element;
  className?: string;
}

interface IMeatballsMenuProps {
  items: IMeatballsMenuItem[];
}

const MeatballsMenu: FC<IMeatballsMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-6">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {items.map(({ label, onClick, icon, className }) => (
          <DropdownMenuItem
            key={label}
            className={className}
            onSelect={onClick}
          >
            {icon}
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MeatballsMenu;
