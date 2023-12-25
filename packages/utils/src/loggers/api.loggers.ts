import { API, APIError } from '@alfred/models';
import pino, { DestinationStream, Logger } from 'pino';

interface IPinoTransport {
  target: string;
  options: { [key: string]: unknown };
}

const fileTransport: IPinoTransport = {
  target: 'pino-pretty',
  options: {
    ignore: 'pid,hostname',
    destination: `./logs/${process.env.npm_package_name}.log`,
    translateTime: 'SYS:yyyy-mm-dd hh:MM:ss',
    mkdir: true
  }
};

const terminalTransport: IPinoTransport = {
  target: 'pino-pretty',
  options: {
    ignore: 'pid,hostname',
    destination: process.stdout.fd,
    translateTime: 'SYS:hh:MM:ss',
    colorize: true
  }
};

const makeBetterStackTransport = (sourceToken: string): IPinoTransport => ({
  target: '@logtail/pino',
  options: { sourceToken }
});

const makeTransport = (betterStackSourceToken: string): DestinationStream =>
  pino.transport({
    targets: [
      fileTransport,
      terminalTransport,
      makeBetterStackTransport(betterStackSourceToken)
    ]
  });

export const logError = (logger: Logger<string>) => (err: APIError) => {
  logger.error({ origin: err.origin }, err.message);
  return { error: err.message };
};

interface ICreateLoggerProps {
  name: API;
  betterStackSourceToken: string;
  level?: string;
}

export const createLogger = ({
  name,
  level,
  betterStackSourceToken
}: ICreateLoggerProps) => {
  const logger = pino({ name, level }, makeTransport(betterStackSourceToken));
  return { logger, logError: logError(logger) };
};
