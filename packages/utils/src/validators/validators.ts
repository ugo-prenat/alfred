import { Context, Env, MiddlewareHandler, ValidationTargets } from 'hono';
import { validator as honoValidator } from 'hono/validator';
import { ZodSchema, z } from 'zod';
import { API, APIError } from '@alfred/models';
import { Logger } from 'pino';

const validator =
  <
    T extends ZodSchema,
    Target extends keyof ValidationTargets,
    E extends Env,
    P extends string,
    I = z.input<T>,
    O = z.output<T>,
    V extends {
      in: { [K in Target]: I };
      out: { [K in Target]: O };
    } = {
      in: { [K in Target]: I };
      out: { [K in Target]: O };
    }
  >(
    logger: Logger<string>,
    target: Target
  ) =>
  (schema: T): MiddlewareHandler<E, P, V> =>
    honoValidator(target, async (payload: z.infer<T>, c: Context) => {
      const { method, url } = c.req.raw;
      const result = await schema.safeParseAsync(payload);

      if (!result.success) {
        const err = new APIError(`validator: invalid ${target}`, 400, {
          api: process.env.npm_package_name as API,
          method,
          url,
          response: result
        });
        logger.error({ message: err.message, origin: err.origin }, err.message);
        return c.json({ message: err.message, origin: err.origin }, err.status);
      }
      const data = result.data as z.infer<T>;
      return data;
    });

export const createValidators = (logger: Logger<string>) => ({
  payloadValidator: validator(logger, 'json')
});
