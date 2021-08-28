'use strict';
const mongoose = require('mongoose');
import initializeMongoose from './initializeMongoose';
import dbConnect from './connectToDB';

exports.plugin = {  
  name : 'MongoDB',
  register: async (server, options) => {
    // Initialize Mongoose models
    server.expose(initializeMongoose(mongoose));

    // Connect to Mongo DB
    dbConnect();
  }
};