const APP_BACK_URL = import.meta.env.VITE_APP_BACK_URL;

export const makeUrl = (url: string) => APP_BACK_URL + url;

export const getPayload = (init?: RequestInit) => ({
  ...(init?.body && init.body && { payload: JSON.parse(init.body.toString()) })
});
