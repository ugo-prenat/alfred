import './index.css';
import '@services/i18n/config';

import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@components/ui/shadcn/sonner';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './services/router/index.routes';
import { usePreferences } from '@services/state/preferences/preferences.stores';
import { updateRootElement } from '@services/state/preferences/preferences.utils';

const queryClient = new QueryClient();

const App = () => {
  const { theme } = usePreferences();

  useEffect(() => {
    updateRootElement(theme);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
