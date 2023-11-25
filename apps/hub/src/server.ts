import { cors } from 'hono/cors';
import { Hono } from 'hono';
import { logger } from '@stats-station/utils';

export const startServer = () => {
  const app = new Hono();

  app.use('*', cors());
  app.use('*', logger());

  app.get('/', (c) => c.json({ status: 'ok' }));

  app.notFound((c) => c.json({ error: 'Not Found' }, 404));

  // app.showRoutes();

  return app;
};
