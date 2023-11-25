import { serve } from '@hono/node-server';
import { startServer } from './server';

const port = process.env.PORT || 3000;
const server = startServer();

serve({ fetch: server.fetch, port }, () =>
  console.log(`\n⚡️Hub listening on port ${port}\n`)
);
