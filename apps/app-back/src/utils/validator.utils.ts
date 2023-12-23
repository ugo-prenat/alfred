import { createValidators } from '@alfred/utils';
import { logger } from './logger.utils';

export const { payloadValidator } = createValidators(logger);
