import { cors } from 'hono/cors';
import { Hono } from 'hono';
import { logger } from '@stats-station/utils';
import twitterRoute from './services/twitter/twitter.routes';
import twitchRoute from './services/twitch/twitch.routes';

export const startServer = () => {
  const app = new Hono();

  app.use('*', cors());
  app.use('*', logger());

  app.route('/twitter', twitterRoute);
  app.route('/twitch', twitchRoute);

  app.notFound((c) => c.json({ error: 'Not Found' }, 404));

  return app;
};
