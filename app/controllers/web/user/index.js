'use strict';
import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';
import { USER_TYPES } from '../../../libs/constants';

module.exports = {
  description: 'Retrives User data',
  validate: {
    query: Joi.object({
      id: Joi.string().optional(),
      user_type: Joi.string().optional().valid(...USER_TYPES),
    }),
    failAction: (request, h, err) => err
  },
  handler: (request, h) => {
    return new Promise((resolve, reject) => {
      const { User } = request.server.plugins.MongoDB;
      async.auto({
        users: async.asyncify(() => {
          return User.Find(request.query);
        }),
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        } 
        return resolve({
          data: results.data,
          success: true,
        });
      })
    });
  },
};