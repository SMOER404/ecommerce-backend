import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import { ensureLogDirectory } from '../utils/logger.utils';
import * as path from 'path';

const logDir = ensureLogDirectory();
const isProduction = process.env.NODE_ENV === 'production';

export const winstonConfig: WinstonModuleOptions = {
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
      ),
      level: isProduction ? 'info' : 'debug',
    }),
  ],
}; 