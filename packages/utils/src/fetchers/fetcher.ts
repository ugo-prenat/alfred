import { APIError, HTTPMethod } from '@stats-station/models';
import { getPayload } from './fetcher.utils';

const makeFetcher =
  (method: HTTPMethod) =>
  <T>(url: string, origin: string, init?: RequestInit): Promise<T> =>
    fetch(url, {
      headers: { 'Content-Type': 'application/json', ...init?.headers },
      method,
      ...init
    })
      .then((res) => {
        if (res.ok) return res.json();

        return res.json().then((data) => {
          throw new APIError(res.statusText, res.status, {
            api: origin,
            method,
            url,
            ...getPayload(init),
            response: data
          });
        });
      })
      .catch((err) => {
        if (err instanceof APIError) throw err;
        throw new APIError(err.message, err.status || 500, {
          api: origin,
          method,
          url,
          ...getPayload(init),
          response: err.message
        });
      });

export const fetcher = {
  GET: makeFetcher('GET'),
  PUT: makeFetcher('PUT'),
  POST: makeFetcher('POST'),
  DELETE: makeFetcher('DELETE')
};
