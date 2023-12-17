export interface IOrigin {
  api: string;
  method: string;
  url: string;
  payload?: any;
  response?: any;
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
