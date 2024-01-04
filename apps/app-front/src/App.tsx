import './index.css';
import '@services/i18n/config';

import { useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
      <Toaster />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
