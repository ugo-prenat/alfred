import { HTTPMethod } from '@stats-station/models';

const makeFetcher =
  (method: HTTPMethod) =>
  <T>(url: string, init?: RequestInit): Promise<T> =>
    fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method,
      ...init
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.statusText);
      })
      .catch((err) => {
        throw new Error(err.message);
      });

export const fetcher = {
  GET: makeFetcher('GET'),
  PUT: makeFetcher('PUT'),
  POST: makeFetcher('POST'),
  DELETE: makeFetcher('DELETE')
};
