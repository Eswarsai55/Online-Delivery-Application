'use strict';

import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';

module.exports = {
  description: "Menu data",
  auth: false,
  validate: {
    query: Joi.object({
      id: Joi.string().optional(),
      category_id: Joi.string().optional(),
      type: Joi.string().optional(),
    }),
    failAction: (request, h, err) => err
  },
  handler: async(request, h) => {
    return new Promise((resolve, reject) => {
      const { Menu } = request.server.plugins.MongoDB;
      async.auto({
        menu: async.asyncify(() => Menu.Find(request.query)),
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results.data,
          success: true,
        })
      })
    })
  }
}