'use strict';

import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';

module.exports = {
  description: 'Add new Category',
  auth: {
    scope: 'ADMIN'
  },
  validate: {
    payload: Joi.object({
      name: Joi.string().required(),
    }),
    failAction: (request, h, err) => err
  },
  handler: async(request,h) => {
    const { Category } = request.server.plugins.MongoDB;
    const { name } = request.payload;
    return new Promise((resolve, reject) => {
      async.auto({
        isCategoryPresent: async.asyncify(() => {
          return Category.Find({
            name: {
              $regex: name,
              $options: 'i',
            },
          }, false);
        }),
        category: ['isCategoryPresent', async.asyncify(results => {
          const { isCategoryPresent } = results;

          if (!isCategoryPresent) {
            return Category.Save(request.payload);
          }
          return Promise.reject(Boom.badRequest('Category already exists'));
        })],

      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results.category,
          success: true,
        });

      })
      
    })
  },
}