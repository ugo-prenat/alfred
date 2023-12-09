import { APIError } from '@stats-station/models';

export const logError = (err: APIError) => {
  const error = {
    status: err.status,
    origin: err.origin
  };
  console.error(error);
  return error;
};
