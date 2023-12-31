import { useTranslation } from '@services/i18n/useTranslation';
import { Link } from '@tanstack/react-router';
import { Bot, History, Package, Shield } from 'lucide-react';

const Menu = () => {
  const t = useTranslation();

  const linkClasses =
    'flex items-center gap-4 px-6 py-2 text-muted-foreground font-light rounded-md whitespace-nowrap hover:text-foreground transition-all duration-100 ease-in-out';
  const iconClasses = 'w-5 h-5 stroke-[1.5]';

  return (
    <div className="h-full flex flex-col justify-between p-6 border-r dark:border-primary-foreground">
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
      <p>broadcaster/bot link</p>
    </div>
  );
};

export default Menu;
