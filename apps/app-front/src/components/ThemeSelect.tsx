import { Theme } from '@services/state/preferences/preferences.models';
import { usePreferencesStore } from '@services/state/preferences/preferences.store';
import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/shadcn/dropdown-menu';
import { Button } from './ui/shadcn/button';
import { Moon, Sun } from 'lucide-react';

interface IThemeSelect {
  label: string;
  value: Theme;
}

interface IThemeSelectProps {
  themes: IThemeSelect[];
  onChange: (theme: Theme) => () => void;
}

const ThemeSelect: FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { setTheme } = usePreferencesStore();

  const handleChange = (theme: Theme) => () => {
    setTheme(theme);
  };

  const themes: IThemeSelect[] = [
    { label: 'intl light', value: 'light' },
    { label: 'intl dark', value: 'dark' },
    { label: 'intl system', value: 'system' }
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-none w-8 h-8">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
