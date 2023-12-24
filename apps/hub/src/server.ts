import { cors } from 'hono/cors';
import { Hono } from 'hono';
import { honoLogger } from '@alfred/utils';
import twitterRoute from './services/twitter/twitter.routes';
import twitchRoute from './services/twitch/twitch.routes';
import { logError, logger } from './utils/logger.utils';
import { APIError } from '@alfred/models';

export const createServer = () => {
  const app = new Hono();

  app.use('*', cors());
  app.use('*', honoLogger());

  app.route('/twitter', twitterRoute);
  app.route('/twitch', twitchRoute);

  app.notFound((c) => {
    const { method, path } = c.req;
    logger.error(`route ${path} not found`);
    return c.json({ error: `route ${method} ${path} not found` }, 404);
  });

  app.onError((err, c) => {
    const { url, method } = c.req.raw;
    const { name, message } = err;

    const error = new APIError(message, 500, {
      url,
      method,
      api: 'hub',
      response: { name: 'Hono error', message }
    });
    return c.json(logError(error), error.status);
  });

  return app;
};
