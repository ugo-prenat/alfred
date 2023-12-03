import { APIError, HTTPMethod } from '@stats-station/models';

const makeFetcher =
  (method: HTTPMethod) =>
  <T>(url: string, init?: RequestInit): Promise<T> =>
    fetch(url, {
      headers: { 'Content-Type': 'application/json', ...init?.headers },
      method,
      ...init
    })
      .then((res) => {
        if (res.ok) return res.json();
        console.error(res);
        throw new APIError(res.statusText, res.status);
      })
      .catch((err) => {
        console.error(err);
        throw new APIError(err.message, err.status || 500);
      });

export const fetcher = {
  GET: makeFetcher('GET'),
  PUT: makeFetcher('PUT'),
  POST: makeFetcher('POST'),
  DELETE: makeFetcher('DELETE')
};
