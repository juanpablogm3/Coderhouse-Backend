import 'dotenv/config';
import winston, { format } from "winston";
import config from './config/environmentConfig.js';

const myLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors:{
    fatal: 'red',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'gray',
  }
}

winston.addColors(myLevels.colors);

const developmentLogger = winston.createLogger({    //developmentLogger
  levels: myLevels.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple(),
      ),
    })
  ]
});

const productionLogger = winston.createLogger({
  levels: myLevels.levels,
  transports: [
    new winston.transports.Console({ 
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ 
      filename: 'errors.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  ]
});

const logger = process.env.environment === 'DEVELOPMENT' ? developmentLogger : productionLogger;

export { logger };
  