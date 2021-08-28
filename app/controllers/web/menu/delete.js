'use strict';

import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';

module.exports = {
  description: 'Delete menu data',
  auth: {
    scope: 'ADMIN'
  },
  validate: {
    payload: Joi.object({
      id: Joi.string().required(),
    }),
    failAction: (request, h, err) => err
  },
  handler: async(request, h) => {
    return new Promise((resolve,reject)  => {
      const { Menu } = request.server.plugins.MongoDB;
      const { id } = request.payload;
      async.auto({
        menu: async.asyncify(() => Menu.Delete(id)),
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results.menu,
          success: true,
        });
      })
    })
  }
}