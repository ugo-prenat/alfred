import Sheet from '@components/ui/Sheet';
import { useWindowSize } from '@hooks/useWindowSize.hooks';
import { usePreferences } from '@services/state/preferences/preferences.stores';
import { cn } from '@utils/tailwind.utils';
import { FC, useEffect, useState } from 'react';
import MenuLinks from './MenuLinks';

const HIDE_MENU_BREAKPOINT = 1000;

const Menu = () => {
  const { isMenuOpen, toggleMenu } = usePreferences();
  const { width } = useWindowSize();

  useEffect(() => {
    if (width <= HIDE_MENU_BREAKPOINT && isMenuOpen) toggleMenu();
  }, [width]);

  if (!isMenuOpen) return null;

  return width <= HIDE_MENU_BREAKPOINT ? <MenuSheet /> : <MenuContent />;
};

const MenuContent: FC<{ onLinkClick?: () => void }> = ({ onLinkClick }) => {
  return (
    <div className="h-full min-w-64 max-w-64 flex flex-col justify-between px-4 py-10 border-r dark:border-primary-foreground">
      <MenuLinks onLinkClick={onLinkClick} />
    </div>
  );
};

const MenuSheet = () => {
  const { isMenuOpen, toggleMenu } = usePreferences();
  const [action, setAction] = useState<'close' | 'open'>(
    isMenuOpen ? 'open' : 'close'
  );

  const handleLinkClick = () => handleOpenChange(true)(false);
  const handleOpenChange =
    (custom: boolean = false) =>
    (open: boolean) => {
      if (custom) setAction(open ? 'open' : 'close');
      if (!open) {
        setTimeout(() => {
          // wait for animation to finish
          toggleMenu();
        }, 300);
      }
    };

  return (
    <Sheet
      side="left"
      open={isMenuOpen}
      onOpenChange={handleOpenChange()}
      content={<MenuContent onLinkClick={handleLinkClick} />}
      className={cn('w-fit p-0 pt-6 border-none border-r-0', {
        '-translate-x-full !duration-300': action === 'close'
      })}
    />
  );
};

export default Menu;
