import {logger} from '../utils.js';

const loggerTest = (req, res) => {
  logger.debug('Debug message');
  logger.http('HTTP message');
  logger.info('Info message');
  logger.warning('Warning message');
  logger.error('Error message');
  logger.fatal('Fatal message');

  logger.debug('Debug message - Production');
  logger.http('HTTP message - Production');
  logger.info('Info message - Production');
  logger.warning('Warning message - Production');
  logger.error('Error message - Production');
  logger.fatal('Fatal message - Production');

  res.send('Logger test completed.');
};

export { loggerTest };