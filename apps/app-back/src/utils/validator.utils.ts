import { createPayloadValidator } from '@stats-station/utils';
import { logger } from './logger.utils';

export const payloadValidator = createPayloadValidator(logger);
