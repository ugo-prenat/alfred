import { serve } from '@hono/node-server';
import { createServer } from './server';
import { dbConnect } from './db.config';

const port = process.env.PORT || 3000;
const server = createServer();

serve({ fetch: server.fetch, port }, () =>
  console.log(`\n⚡️App-back listening on port ${port}`)
);

dbConnect()
  .then(() => console.log('⚡️Connected to MongoDB\n'))
  .catch((err) => console.log('error connecting to MongoDB', err));
