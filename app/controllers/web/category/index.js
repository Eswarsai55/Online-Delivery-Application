'use strict';

import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';

module.exports = {
  description: "Category data",
  auth: false,
  validate: {
    query: Joi.object({
      id: Joi.string().optional(),
      name: Joi.string(),
    }),
    failAction: (request, h, err) => err
  },
  handler: async(request, h) => {
    return new Promise((resolve, reject) => {
      const { Category } = request.server.plugins.MongoDB;
      async.auto({
        categories: async.asyncify(() => Category.Find(request.query)),
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results.categories,
          success: true,
        })
      })
    })
  }
}