import { MiddlewareHandler } from 'hono/types';
import { colorStatus, getPath, getTime } from './logs.utils';
import { API, APIError } from '@alfred/models';
import pino, { Logger } from 'pino';
import { makeTransport } from './logs.models';

export const honoLogger = (): MiddlewareHandler => {
  return async (c, next) => {
    const req = c.req;
    const start = Date.now();

    await next();
    console.log(
      `${req.method} ${getPath(req)}  ${colorStatus(c.res.status)} ${getTime(
        start
      )}`
    );
  };
};

interface ICreateLoggerProps {
  name: API;
  betterStackSourceToken: string;
  level?: string;
}

export const logError = (logger: Logger<string>) => (err: APIError) => {
  logger.error({ origin: err.origin }, err.message);
  return { error: err.message };
};

export const createLogger = ({
  name,
  level,
  betterStackSourceToken
}: ICreateLoggerProps) => {
  const logger = pino({ name, level }, makeTransport(betterStackSourceToken));
  return { logger, logError: logError(logger) };
};
