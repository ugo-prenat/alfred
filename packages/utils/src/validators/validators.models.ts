import { Context, Env } from 'hono';

export type PayloadContext<T> = Context<
  Env,
  string,
  { in: { json: T }; out: { json: T } }
>;

export type HeadersContext<T extends Record<string, string> | undefined> =
  Context<Env, string, { in: { header: T }; out: { header: T } }>;
