const winston = require('winston');
const path = require('path');
const fs = require('fs');



const LOG_DIR = process.env.LOG_DIR || '../logs';

const logDir = path.join(__dirname, LOG_DIR);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: path.join(logDir, 'debug'),
      filename: `%DATE%.log`,
      maxFiles: 30,
      json: false,
      zippedArchive: true,
    }),
    new winston.transports.File({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: path.join(logDir, 'error'),
      filename: `%DATE%.log`,
      maxFiles: 30,
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = { logger };
