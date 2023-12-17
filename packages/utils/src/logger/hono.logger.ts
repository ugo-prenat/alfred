import { HonoRequest } from 'hono';
import { MiddlewareHandler } from 'hono/types';

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

const humanize = (times: string[]) => {
  const [delimiter, separator] = [',', '.'];
  const orderTimes = times.map((v) =>
    v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + delimiter)
  );
  return orderTimes.join(separator);
};

const getTime = (start: number) => {
  const delta = Date.now() - start;
  const humanized = humanize([
    delta < 1000 ? delta + 'ms' : Math.round(delta / 1000) + 's'
  ]);
  return `\x1b[90m${humanized}\x1b[0m`;
};

const colorStatus = (status: number) => {
  const out: { [key: string]: string } = {
    7: `\x1b[35m${status}\x1b[0m`,
    5: `\x1b[31m${status}\x1b[0m`,
    4: `\x1b[33m${status}\x1b[0m`,
    3: `\x1b[36m${status}\x1b[0m`,
    2: `\x1b[32m${status}\x1b[0m`,
    1: `\x1b[32m${status}\x1b[0m`,
    0: `\x1b[33m${status}\x1b[0m`
  };
  const calculateStatus = (status / 100) | 0;
  return out[calculateStatus];
};

const getPath = (req: HonoRequest) => {
  const pathMatch = req.raw.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return pathMatch ? pathMatch[1] : req.path;
};
