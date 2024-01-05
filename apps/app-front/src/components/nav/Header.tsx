import GitHub from '@assets/icons/GitHub';
import X from '@assets/icons/X';
import LangSelect from '@components/LangSelect';
import ThemeSelect from '@components/ThemeSelect';
import IconLink from '@components/ui/IconLink';
import { Separator } from '@components/ui/shadcn/separator';
import ToggleMenuBtn from './ToggleMenuBtn';
import { Link } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import { Button } from '@components/ui/shadcn/button';
import Tooltip from '@components/ui/Tooltip';
import { useTranslation } from '@services/i18n/useTranslation';

const Header = () => {
  const t = useTranslation();
  return (
    <div className="h-12 flex justify-between items-center px-2 border-b dark:border-primary-foreground">
      <ToggleMenuBtn />

      <div className="flex items-center gap-x-2">
        <LangSelect compact />
        <ThemeSelect compact />

        <Separator orientation="vertical" className="h-6" />

        <IconLink
          icon={<GitHub className="w-[15px] h-[15px]" />}
          href="https://github.com/ugo-prenat/alfred"
        />
        <IconLink
          icon={<X className="w-[14px] h-[14px]" />}
          href="https://twitter.com/AlfredStats"
        />

        <Separator orientation="vertical" className="h-6" />

        <Tooltip text={t('nav.logout')} delay={700}>
          <Link to="/onboarding">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <LogOut className="w-4 h-4" />
            </Button>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
