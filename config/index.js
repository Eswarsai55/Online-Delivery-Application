'use strict';

import Glue from '@hapi/glue';
import Environment from '../app/libs/environment';
Environment();

// import logger from 'winston-logger';

// const util = require('util');
import Manifest from './manifest';
const manifest = Object.assign({}, Manifest());

const composeOptions = {
  relativeTo: __dirname
};

const init = async () => {
  try {
    const server = await Glue.compose(manifest, composeOptions);
    await server.start();
    // logger.info(`Server started at ${ server.info.uri }`);
    console.log(`Server started at ${ server.info.uri }`)
  }
  catch (err) {
    console.log(err);
    console.log('Failed to start server');
    // logger.error(err);
    // logger.error('Failed to start server');
    process.exit(1);
  }
};

init();
