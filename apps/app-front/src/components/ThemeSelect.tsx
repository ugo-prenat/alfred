import { Theme } from '@services/state/preferences/preferences.models';
import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/shadcn/dropdown-menu';
import { Button } from './ui/shadcn/button';
import { Moon, Sun } from 'lucide-react';
import { usePreferences } from '@services/state/preferences/preferences.stores';
import { useTranslation } from '@services/i18n/useTranslation';
import Tooltip from './ui/Tooltip';

interface IThemeSelect {
  label: string;
  value: Theme;
}

interface IThemeSelectProps {
  themes: IThemeSelect[];
  onChange: (theme: Theme) => () => void;
}

const ThemeSelect: FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { setTheme } = usePreferences();
  const t = useTranslation();

  const handleChange = (theme: Theme) => () => {
    setTheme(theme);
  };

  const themes: IThemeSelect[] = [
    { label: t('theme.light'), value: 'light' },
    { label: t('theme.dark'), value: 'dark' },
    { label: t('theme.system'), value: 'system' }
  ];

  const themeSelectProps: IThemeSelectProps = {
    themes,
    onChange: handleChange
  };

  return compact ? (
    <CompactThemeSelect {...themeSelectProps} />
  ) : (
    <LargeThemeSelect {...themeSelectProps} />
  );
};

const LargeThemeSelect: FC<IThemeSelectProps> = () => {
  return (
    <div>
      <p>LargeThemeSelect</p>
    </div>
  );
};

const CompactThemeSelect: FC<IThemeSelectProps> = ({ themes, onChange }) => {
  const t = useTranslation();
  return (
    <DropdownMenu>
      <Tooltip text={t('theme')} delay={700}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="border-none w-8 h-8">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent>
        {themes.map(({ label, value }) => (
          <DropdownMenuItem key={value} onClick={onChange(value)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelect;
