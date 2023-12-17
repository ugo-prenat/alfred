export interface IOrigin {
  api: string;
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
