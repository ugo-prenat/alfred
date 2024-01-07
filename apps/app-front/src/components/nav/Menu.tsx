import BroadcasterAndBotLink from '@components/BroadcasterAndBotLink/BroadcasterAndBotLink';
import Sheet from '@components/ui/Sheet';
import { useWindowSize } from '@hooks/useWindowSize.hooks';
import { useTranslation } from '@services/i18n/useTranslation';
import { usePreferences } from '@services/state/preferences/preferences.stores';
import { Link } from '@tanstack/react-router';
import { cn } from '@utils/tailwind.utils';
import { Bot, History, Package, Shield } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

const HIDE_MENU_BREAKPOINT = 1000;

const Menu = () => {
  const { isMenuOpen, toggleMenu } = usePreferences();
  const { width } = useWindowSize();

  useEffect(() => {
    if (width <= HIDE_MENU_BREAKPOINT && isMenuOpen) toggleMenu();
  }, [width]);

  if (!isMenuOpen) return null;

  return width <= HIDE_MENU_BREAKPOINT ? <MenuSheet /> : <Content />;
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
      content={<Content onLinkClick={handleLinkClick} />}
      className={cn('w-fit p-0 border-none border-r-0', {
        '-translate-x-full !duration-300': action === 'close'
      })}
    />
  );
};

const Content: FC<{ onLinkClick?: () => void }> = ({ onLinkClick }) => {
  const t = useTranslation();

  const linkClasses =
    'flex items-center gap-4 p-2 text-muted-foreground dark:font-light rounded-md whitespace-nowrap hover:text-foreground transition-all duration-100 ease-in-out';
  const iconClasses = 'w-5 h-5 dark:stroke-[1.5]';

  return (
    <div className="h-full max-w-60 flex flex-col justify-between px-8 py-10 border-r dark:border-primary-foreground">
      <div className="flex flex-col gap-4">
        <Link to="/features" className={linkClasses} onClick={onLinkClick}>
          <Package className={iconClasses} />
          {t('nav.features')}
        </Link>
        <Link to="/bot" className={linkClasses} onClick={onLinkClick}>
          <Bot className={iconClasses} />
          {t('nav.bot')}
        </Link>
        <Link to="/history" className={linkClasses} onClick={onLinkClick}>
          <History className={iconClasses} />
          {t('nav.history')}
        </Link>
        <Link to="/admin" className={linkClasses} onClick={onLinkClick}>
          <Shield className={iconClasses} />
          {t('nav.admin')}
        </Link>
      </div>

      <BroadcasterAndBotLink />
    </div>
  );
};

export default Menu;
