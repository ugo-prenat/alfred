import { Theme } from './preferences.models';

export const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const updateRootElement = (theme: Theme) => {
  const root = window.document.documentElement;
  const newTheme = theme === 'system' ? getSystemTheme() : theme;
  root.classList.remove('light', 'dark');
  root.classList.add(newTheme);
};
