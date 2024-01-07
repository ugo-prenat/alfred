import Sheet from '@components/ui/Sheet';
import { useWindowSize } from '@hooks/useWindowSize.hooks';
import { useTranslation } from '@services/i18n/useTranslation';
import { useAuthStore } from '@services/state/auth/auth.stores';
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
  const { bot } = useAuthStore();
  const isBotLinked = !!bot && bot.status === 'active';

  const linkClasses =
    'flex items-center gap-3 py-2 px-6 text-muted-foreground rounded-md whitespace-nowrap hover:bg-accent hover:text-accent-foreground transition-all duration-100 ease-in-out';
  const iconClasses = 'w-5 h-5';

  return (
    <div className="h-full min-w-64 max-w-64 flex flex-col justify-between px-4 py-10 border-r dark:border-primary-foreground">
      <div className="flex flex-col gap-1">
        <Link
          to="/features"
          className={linkClasses}
          onClick={onLinkClick}
          activeProps={{ className: '!text-accent-foreground' }}
        >
          <Package className={iconClasses} />
          {t('nav.features')}
        </Link>
        <Link
          to="/bot"
          className={linkClasses}
          onClick={onLinkClick}
          activeProps={{ className: '!text-accent-foreground' }}
        >
          <Bot className={iconClasses} />
          {t('nav.bot')}
          {!isBotLinked && (
            <span className="relative -right-6 w-2 h-2 rounded-full bg-warning"></span>
          )}
        </Link>
        <Link
          to="/history"
          className={linkClasses}
          onClick={onLinkClick}
          activeProps={{ className: '!text-accent-foreground' }}
        >
          <History className={iconClasses} />
          {t('nav.history')}
        </Link>
        <Link
          to="/admin"
          className={linkClasses}
          onClick={onLinkClick}
          activeProps={{ className: '!text-accent-foreground' }}
        >
          <Shield className={iconClasses} />
          {t('nav.admin')}
        </Link>
      </div>
    </div>
  );
};

export default Menu;
