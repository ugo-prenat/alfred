import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PREFERENCES_STORAGE_KEY, Theme } from './preferences.models';
import { updateRootElement } from './preferences.utils';

interface IPreferencesStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const usePreferencesStore = create<IPreferencesStore>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        updateRootElement(theme);
        set({ theme });
      }
    }),
    { name: PREFERENCES_STORAGE_KEY }
  )
);
