import { Context, Env } from 'hono';

export type PayloadContext<T, Params extends string = '/'> = Context<
  Env,
  Params,
  { in: { json: T }; out: { json: T } }
>;

export type HeadersContext<T extends Record<string, string> | undefined> =
  Context<Env, string, { in: { header: T }; out: { header: T } }>;
