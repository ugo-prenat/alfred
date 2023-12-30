import './index.css';

import { useEffect } from 'react';
import { Toaster } from '@components/ui/shadcn/sonner';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './services/router/index.routes';
import { usePreferencesStore } from '@services/state/preferences/preferences.store';
import { updateRootElement } from '@services/state/preferences/preferences.utils';

const App = () => {
  const { theme } = usePreferencesStore();

  useEffect(() => {
    updateRootElement(theme);
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
