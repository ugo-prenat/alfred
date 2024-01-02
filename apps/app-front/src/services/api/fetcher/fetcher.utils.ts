import { defaultInit } from './fetcher.models';
import { APIError, HTTPMethod } from '@alfred/models';

const APP_BACK_URL = import.meta.env.VITE_APP_BACK_URL;

export const fetcher = {
  get: <TResponse>(url: string, init?: RequestInit): Promise<TResponse> =>
    fetch(makeUrl(url), { ...defaultInit, ...init, method: '' })
      .then((res) => {
        if (res.ok) return res.json();
        throw makeAPIError(res.statusText, res.status, 'GET', url, res);
      })
      .then((res) => res as TResponse)
      .catch((err) => {
        if (err instanceof APIError) throw err;
        throw makeAPIError(err.message, err.status || 500, 'GET', url, err);
      }),

  post: <TResponse>(url: string, body: unknown, init?: RequestInit) =>
    fetch(makeUrl(url), {
      ...defaultInit,
      ...init,
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw makeAPIError(res.statusText, res.status, 'POST', url, res);
      })
      .then((res) => res as TResponse)
      .catch((err) => {
        throw makeAPIError(err.message, err.status || 500, 'POST', url, err);
      })
};

const makeUrl = (url: string) => APP_BACK_URL + url;

const makeAPIError = (
  message: string,
  status: number,
  method: HTTPMethod,
  url: string,
  err: unknown
): APIError =>
  new APIError(message, status, {
    api: 'app-back',
    method,
    url: makeUrl(url),
    response: err
  });
