import { useTranslation } from '@services/i18n/useTranslation';
import { usePreferences } from '@services/state/preferences/preferences.stores';
import { Link } from '@tanstack/react-router';
import { cn } from '@utils/tailwind.utils';
import { Bot, History, Package, Shield } from 'lucide-react';
import ToggleMenuBtn from './ToggleMenuBtn';

const Menu = () => {
  const t = useTranslation();
  const { isMenuOpen } = usePreferences();

  const linkClasses =
    'flex items-center gap-4 p-2 text-muted-foreground dark:font-light rounded-md whitespace-nowrap hover:text-foreground transition-all duration-100 ease-in-out';
  const iconClasses = 'w-5 h-5 dark:stroke-[1.5]';

  return (
    <div
      className={cn(
        'h-full flex flex-col justify-between px-8 py-6 border-r dark:border-primary-foreground',
        { hidden: !isMenuOpen }
      )}
    >
      <div className="flex flex-col gap-4">
        <Link to="/" className={linkClasses}>
          <Package className={iconClasses} />
          {t('nav.features')}
        </Link>
        <Link to="/bot" className={linkClasses}>
          <Bot className={iconClasses} />
          {t('nav.bot')}
        </Link>
        <Link to="/history" className={linkClasses}>
          <History className={iconClasses} />
          {t('nav.history')}
        </Link>
        <Link to="/admin" className={linkClasses}>
          <Shield className={iconClasses} />
          {t('nav.admin')}
        </Link>
      </div>

      <div>
        <ToggleMenuBtn />
        <p>broadcaster/bot link</p>
      </div>
    </div>
  );
};

export default Menu;
