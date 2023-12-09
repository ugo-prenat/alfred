import { APIError } from '@stats-station/models';

export const logError = (err: APIError) => ({
  status: err.status,
  origin: err.origin
});
