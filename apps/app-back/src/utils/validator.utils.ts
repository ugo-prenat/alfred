import { createValidators } from '@alfred/utils';
import { logger } from './logger.utils';

export const { headersValidator, payloadValidator } = createValidators(logger);
