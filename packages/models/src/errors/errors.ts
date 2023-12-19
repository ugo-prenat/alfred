export type API = 'app-back' | 'hub' | 'scheduler' | 'twitch' | 'twitter';

export interface IOrigin {
  api: API;
  method: string;
  url: string;
  payload?: unknown;
  response?: unknown;
}

export class APIError extends Error {
  status: number;
  origin: IOrigin;

  constructor(message: string, status: number, origin: IOrigin) {
    super(message);
    this.status = status;
    this.origin = origin;
  }
}
