import './index.css';
import '@services/i18n/config';

import { useEffect } from 'react';
import { Toaster } from '@components/ui/shadcn/sonner';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './services/router/index.routes';
import { usePreferences } from '@services/state/preferences/preferences.stores';
import { updateRootElement } from '@services/state/preferences/preferences.utils';
import { useAuthenticate } from '@hooks/auth/useAuthenticate.hooks';

const App = () => {
  const { theme } = usePreferences();
  const { isPending } = useAuthenticate();

  useEffect(() => {
    updateRootElement(theme);
  }, []);

  if (isPending) return <div>Alfred wakes up...</div>;

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
