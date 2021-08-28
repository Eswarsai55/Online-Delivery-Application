// import configuration from './configure';

// const {
//   WINSTON_LOGGER_CONSOLE_LEVEL,
//   WINSTON_LOGGER_FILE_PATH,
//   WINSTON_LOGGER_FILE_LEVEL,
// } = process.env;

// const register = function(server, options, next) {
//   configuration(
//   //   {
//   //   console: {
//   //     level: WINSTON_LOGGER_CONSOLE_LEVEL || 'debug'
//   //   },
//   //   file: {
//   //     filename: WINSTON_LOGGER_FILE_PATH + '/main.log',
//   //     level: WINSTON_LOGGER_FILE_LEVEL,
//   //   },
//   // }
//   );
//   return next();
// };

// register.name = 'winston';

// exports.register.attributes = {
//   name: 'Winston',
//   version: '1.0.0'
// };

// export default {
//   register,
//   // name: 'winston',
//   // version: '1.0.0',
//   // register.
// };

// module.exports = register;


'use strict';
import configuration from './configure';
// const Nodemailer = require('nodemailer');
// const EmailTemplate = require('email-templates');
// const Path = require('path');

const {
  WINSTON_LOGGER_CONSOLE_LEVEL,
  WINSTON_LOGGER_FILE_PATH,
  WINSTON_LOGGER_FILE_LEVEL,
} = process.env;

exports.plugin = {
  register: (server, options) => {
    return configuration({
      console: {
        level: WINSTON_LOGGER_CONSOLE_LEVEL || 'debug'
      },
      file: {
        filename: WINSTON_LOGGER_FILE_PATH + '/main.log',
        level: WINSTON_LOGGER_FILE_LEVEL,
      },
    });
  },
  pkg: require('../../../package.json'),
  name: 'winston-logger'
};

