import { AnchorHTMLAttributes, FC, cloneElement } from 'react';
import { ActiveLinkOptions, Link } from '@tanstack/react-router';
import { cn } from '@utils/tailwind.utils';
import { useTranslation } from '@services/i18n/useTranslation';
import { useAuthStore } from '@services/state/auth/auth.stores';
import { Bot, History, Package, Shield } from 'lucide-react';
import { BroadcasterRole } from '@alfred/models';
interface IActionPin {
  severity: 'info' | 'warning' | 'error';
}

interface MenuLinkProps
  extends ActiveLinkOptions,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'target'> {
  label?: string;
  icon: JSX.Element;
  requiredrole?: BroadcasterRole;
  pin?: IActionPin | null;
}

interface IMenuLinkProps {
  onLinkClick?: () => void;
}

const MenuLinks: FC<IMenuLinkProps> = ({ onLinkClick }) => {
  const t = useTranslation();
  const { bot, broadcaster } = useAuthStore();
  const isBotLinked = !!bot && bot.status === 'active';

  const MenuLink: FC<MenuLinkProps> = ({
    label,
    icon,
    requiredrole,
    pin,
    ...props
  }) => {
    return (
      <Link
        {...props}
        className={cn(
          'flex items-center gap-3 py-2 px-6 text-muted-foreground rounded-md whitespace-nowrap hover:bg-accent hover:text-accent-foreground transition-all duration-100 ease-in-out',
          props.className
        )}
        onClick={onLinkClick}
        activeProps={{ className: '!text-accent-foreground' }}
      >
        {cloneElement(icon, { className: 'w-5 h-5' })}
        {label || t(`nav.${props.to?.replace('/', '')}`)}
        {pin && (
          <span
            className={cn('relative -right-6 w-2 h-2 rounded-full', {
              'bg-warning': pin.severity === 'warning'
            })}
          ></span>
        )}
      </Link>
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <MenuLink to="/features" icon={<Package />} />
      <MenuLink
        to="/bot"
        icon={<Bot />}
        pin={!isBotLinked ? { severity: 'warning' } : null}
      />
      <MenuLink to="/history" icon={<History />} />
      <MenuLink to="/admin" icon={<Shield />} requiredrole="admin" />
    </div>
  );
};

export default MenuLinks;
