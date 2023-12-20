import { Context, Env } from 'hono';

export type PayloadContext<T> = Context<
  Env,
  string,
  { in: { json: T }; out: { json: T } }
>;
