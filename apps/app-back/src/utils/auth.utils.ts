import { createAuth } from '@alfred/utils';
import { logger } from './logger.utils';

export const { checkAuth, requiredAuth } = createAuth(
  process.env.JWT_SECRET,
  logger
);
