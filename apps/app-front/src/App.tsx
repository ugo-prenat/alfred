import './index.css';
import '@services/i18n/config';

import { useEffect } from 'react';
import { Toaster } from '@components/ui/shadcn/sonner';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './services/router/index.routes';
import { usePreferences } from '@services/state/preferences/preferences.stores';
import { updateRootElement } from '@services/state/preferences/preferences.utils';
import { useAuthenticate } from '@hooks/auth/useAuthenticate.hooks';
import Page from '@components/Page';
import { useTranslation } from '@services/i18n/useTranslation';

const App = () => {
  const t = useTranslation();
  const { theme } = usePreferences();
  const { isPending } = useAuthenticate();

  useEffect(() => {
    updateRootElement(theme);
  }, []);

  if (isPending)
    return (
      <Page className="flex items-center justify-center">
        <p className="text-muted-foreground/50 animate-breath">
          {t('loading.alfred.wakesUp')}
        </p>
      </Page>
    );

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
