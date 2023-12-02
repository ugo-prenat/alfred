import { serve } from '@hono/node-server';
import { createServer } from './server';
import { dbConnect } from './db.config';

const port = process.env.PORT;
const server = createServer();

serve({ fetch: server.fetch, port }, () =>
  console.log(`\n⚡️app-back listening on port ${port}`)
);

dbConnect()
  .then(() => console.log('⚡️connected to MongoDB\n'))
  .catch((err) => console.log('error connecting to MongoDB', err));
