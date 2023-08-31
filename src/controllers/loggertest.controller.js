import {logger} from '../logger.js'
import 'dotenv/config';

const loggerTest = (req, res) => {
  console.log('\nLog levels')
  if(process.env.environment==='DEVELOPMENT'){
    logger.debug('Debug message');
    logger.http('HTTP message');
    logger.info('Info message');
    logger.warn('Warning message');
    logger.error('Error message');
    logger.fatal('Fatal message');
  } else {
    logger.debug('Debug message - Production');
    logger.http('HTTP message - Production');
    logger.info('Info message - Production');
    logger.warn('Warning message - Production');
    logger.error('Error message - Production');
    logger.fatal('Fatal message - Production');
  }
  res.send('Logger test completed.');
};

export { loggerTest };