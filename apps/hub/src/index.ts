import { serve } from '@hono/node-server';
import { createServer } from './server';
import { dbConnect } from './db.config';
import { logger } from '@stats-station/utils';

const port = process.env.PORT;
const server = createServer();

serve({ fetch: server.fetch, port }, () =>
  console.log(`\n⚡️hub listening on port ${port}`)
);

dbConnect()
  .then(() => console.log('⚡️connected to MongoDB\n'))
  .catch((err) => logger.error(err, 'error connecting to MongoDB'));
