import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './services/router/index.routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
