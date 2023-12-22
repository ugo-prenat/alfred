import { createPayloadValidator } from '@alfred/utils';
import { logger } from './logger.utils';

export const payloadValidator = createPayloadValidator(logger);
