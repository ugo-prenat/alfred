import Tooltip from '@components/ui/Tooltip';
import { Button } from '@components/ui/shadcn/button';
import { useTranslation } from '@services/i18n/useTranslation';
import { usePreferences } from '@services/state/preferences/preferences.stores';
import { Menu } from 'lucide-react';

const ToggleMenuBtn = () => {
  const { isMenuOpen, toggleMenu } = usePreferences();
  const t = useTranslation();

  return (
    <Tooltip
      delay={500}
      side="right"
      text={t(`nav.menu.action.${isMenuOpen ? 'close' : 'open'}`)}
    >
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8"
        onClick={toggleMenu}
      >
        <Menu className="w-5 h-5" />
      </Button>
    </Tooltip>
  );
};

export default ToggleMenuBtn;
