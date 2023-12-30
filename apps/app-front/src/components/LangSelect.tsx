import { Lang } from '@services/state/preferences/preferences.models';
import { usePreferences } from '@services/state/preferences/preferences.stores';
import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/shadcn/dropdown-menu';
import { Button } from './ui/shadcn/button';

interface ILangSelect {
  label: string;
  value: Lang;
}

interface ILangSelectProps {
  lang: Lang;
  langs: ILangSelect[];
  onChange: (lang: Lang) => () => void;
}

const LangSelect: FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { lang, setLang } = usePreferences();

  const handleChange = (lang: Lang) => () => setLang(lang);

  const langs: ILangSelect[] = [
    { label: '🇺🇸', value: 'en' },
    { label: '🇫🇷', value: 'fr' }
  ];
  const langSelectProps: ILangSelectProps = {
    lang,
    langs,
    onChange: handleChange
  };

  return compact ? (
    <CompactLangSelect {...langSelectProps} />
  ) : (
    <LargeLangSelect {...langSelectProps} />
  );
};

const CompactLangSelect: FC<ILangSelectProps> = ({ lang, langs, onChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-none w-8 h-8">
          <span className="h-4 w-4 select-none">
            {lang === 'fr' ? '🇫🇷' : '🇺🇸'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-0">
        {langs.map(({ label, value }) => (
          <DropdownMenuItem key={value} onClick={onChange(value)}>
            <span className="-mb-1">{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LargeLangSelect: FC<ILangSelectProps> = () => {
  return <p>LargeLangSelect</p>;
};

export default LangSelect;
