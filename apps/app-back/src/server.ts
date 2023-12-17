import { cors } from 'hono/cors';
import { Hono } from 'hono';
import { honoLogger } from '@stats-station/utils';
import twitchRoute from './services/twitch/twitch.routes';
import { logger } from './utils/logger.utils';

export const createServer = () => {
  const app = new Hono();

  app.use('*', cors());
  app.use('*', honoLogger());

  app.get('/', (c) => c.json({ message: 'welcome to app-back' }));
  app.route('/twitch', twitchRoute);

  app.notFound((c) => {
    logger.error(`route ${c.req.path} not found`);
    return c.json({ error: `route '${c.req.path}' not found` }, 404);
  });

  return app;
};
