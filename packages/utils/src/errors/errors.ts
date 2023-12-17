import { APIError } from '@stats-station/models';
import { logger } from '../loggers/api.loggers';

export const logError = (err: APIError) => {
  const error = {
    status: err.status,
    origin: err.origin
  };
  logger.error(error.origin, err.message);
  return error;
};
