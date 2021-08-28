process.env['APP_ROOT_PATH'] = process.cwd();

// ES6
require('babel-core/register');
require("babel-polyfill");

// Kick start the app
require('./config');