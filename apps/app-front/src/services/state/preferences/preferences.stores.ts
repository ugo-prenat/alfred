import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18next from 'i18next';
import {
  DEFAULT_LANG,
  DEFAULT_THEME,
  Lang,
  PREFERENCES_STORAGE_KEY,
  Theme
} from './preferences.models';
import { updateRootElement } from './preferences.utils';

interface IPreferencesStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const usePreferences = create<IPreferencesStore>()(
  persist(
    (set) => ({
      theme: DEFAULT_THEME,
      setTheme: (theme) => {
        updateRootElement(theme);
        set({ theme });
      },
      lang: DEFAULT_LANG,
      setLang: (lang) => {
        i18next.changeLanguage(lang);
        set({ lang });
      }
    }),
    { name: PREFERENCES_STORAGE_KEY }
  )
);
