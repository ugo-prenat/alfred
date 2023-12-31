import Tooltip from '@components/ui/Tooltip';
import { Button } from '@components/ui/shadcn/button';
import { useTranslation } from '@services/i18n/useTranslation';
import { usePreferences } from '@services/state/preferences/preferences.stores';
import { cn } from '@utils/tailwind.utils';
import { ChevronsLeft } from 'lucide-react';

const ToggleMenuBtn = () => {
  const { isMenuOpen, toggleMenu } = usePreferences();
  const t = useTranslation();

  const action = isMenuOpen ? 'close' : 'open';

  return (
    <Tooltip text={t(`nav.menu.action.${action}`)}>
      <Button
        variant={action === 'open' ? 'outline' : 'ghost'}
        size="icon"
        className={cn('w-8 h-8', {
          'rounded-l-none rounded-r-lg absolute -left-2 hover:left-0 transition-all':
            action === 'open'
        })}
        onClick={toggleMenu}
      >
        <ChevronsLeft
          className={cn('h-4 w-4', { 'rotate-180': action === 'open' })}
        />
      </Button>
    </Tooltip>
  );
};

export default ToggleMenuBtn;
