import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { usePreferences } from '@services/state/preferences/preferences.stores';

import en from './en.json';
import fr from './fr.json';

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr }
  },
  lng: usePreferences.getState().lang
});
