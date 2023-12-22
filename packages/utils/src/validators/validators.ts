import { Context, Env, MiddlewareHandler, ValidationTargets } from 'hono';
import { validator as honoValidator } from 'hono/validator';
import { ZodSchema, z } from 'zod';
import { API, APIError } from '@alfred/models';
import { Logger } from 'pino';

interface IValidatorAPIError {
  message: string;
  status: number;
}

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
    logger: Logger<string>
  ) =>
  (target: Target, { message, status }: IValidatorAPIError) =>
  (schema: T): MiddlewareHandler<E, P, V> =>
    honoValidator(target, async (payload: z.infer<T>, c: Context) => {
      const { method, url } = c.req.raw;
      const result = await schema.safeParseAsync(payload);

      if (!result.success) {
        const err = new APIError(message, status, {
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

const payloadValidatorAPIError: IValidatorAPIError = {
  message: 'Invalid payload',
  status: 400
};
export const createPayloadValidator = (logger: Logger<string>) =>
  validator(logger)('json', payloadValidatorAPIError);
