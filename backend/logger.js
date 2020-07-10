import winston from 'winston';
import Sentry from '@sentry/node';

import DailyRotateFile from 'winston-daily-rotate-file';

const logFormat = winston.format.printf((info) => {
  const date = new Date().toISOString();
  let logString = info.message;
  if (info instanceof Error) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(info);
    }
    logString = JSON.stringify({
      message: info.message,
      stack: info.stack,
    }, null, 4).replace(/\\n/g, '\n');
  }
  return `${date}-${info.level}: ${logString}\n`;
});

const transports = [
  new DailyRotateFile({
    datePattern: 'DD-MM-YYYY',
    filename: 'logs/error.log',
    level: 'error',
  }),
  new DailyRotateFile({
    datePattern: 'DD-MM-YYYY',
    filename: 'logs/all.log',
    level: 'debug',
  }),
];

if (process.env.NODE_ENV !== 'production') {
  transports.push(new winston.transports.Console({
    level: 'debug',
  }));
}

const logger = winston.createLogger({
  format: logFormat,
  transports,
});

export default logger;
