import { cors } from 'hono/cors';
import { Hono } from 'hono';
import { logger } from '@stats-station/utils';
import twitchRoute from './services/twitch/twitch.routes';

export const createServer = () => {
  const app = new Hono();

  app.use('*', cors());
  app.use('*', logger());

  app.get('/', (c) => c.json({ message: 'welcome to app-back' }));
  app.route('/twitch', twitchRoute);

  app.notFound((c) =>
    c.json({ error: `route '${c.req.path}' Not Found` }, 404)
  );

  return app;
};
