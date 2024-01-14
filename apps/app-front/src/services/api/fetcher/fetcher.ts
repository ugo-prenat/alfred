import { APIError, HTTPMethod } from '@alfred/models';
import { getPayload, makeUrl } from './fetcher.utils';
import { getAccessToken } from '@hooks/useTokens.hooks';

const makeFetcher =
  (method: HTTPMethod) =>
  <T>(url: string, init?: RequestInit): Promise<T> =>
    fetch(makeUrl(url), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
        ...init?.headers
      },
      method,
      ...init
    })
      .then((res) => {
        if (res.ok) return res.json() as Promise<T>;

        return res.json().then((data) => {
          throw new APIError(res.statusText, res.status, {
            api: 'app-back',
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
          api: 'app-back',
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
