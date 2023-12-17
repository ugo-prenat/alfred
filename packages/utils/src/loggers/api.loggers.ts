import pino, { DestinationStream } from 'pino';

interface IPinoTransport {
  target: string;
  options: {
    ignore?: string;
    destination?: string | number;
    translateTime?: string;
    colorize?: boolean;
    mkdir?: boolean;
  };
}

const fileTransport: IPinoTransport = {
  target: 'pino-pretty',
  options: {
    ignore: 'pid,hostname',
    destination: `./logs/${process.env.npm_package_name}.log`,
    translateTime: 'SYS:standard',
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

const transport: DestinationStream = pino.transport({
  targets: [fileTransport, terminalTransport]
});

export const logger = pino(transport).child({
  name: process.env.npm_package_name
});
