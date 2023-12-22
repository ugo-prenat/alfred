import { API, APIError } from '@stats-station/models';
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
  const error = {
    message: err.message,
    origin: err.origin
  };
  logger.error({ message: error.message, origin: error.origin }, err.message);
  return error;
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
