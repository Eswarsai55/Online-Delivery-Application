import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {
    // service: 'user-service'
  },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

// const consoleDefaults = {
//     level: 'info',
//     handleExceptions: true,
//     timestamp: true,
// }

module.exports = function(options) {
  if (options.console) {
    // const consoleOptions = Object.assign(consoleDefaults, options.console);
    // winston.remove(winston.transports.Console);
    // winston.add(winston.transports.Console, consoleOptions);
  }

  if (options.file) {
    // const fileOptions = Object.assign(fileDefaults, options.file)
    // winston.add(winston.transports.DailyRotateFile, fileOptions);
  }

  process.on('unhandledRejection', (err, p) => {
    // winston.error(err);
  });

  process.on('uncaughtException', function (err) {
    console.log('uncaughtException catched')
    console.trace(err)
    // winston.error('uncaughtException catched');
    // winston.error(err);
  });

  return logger;
}

