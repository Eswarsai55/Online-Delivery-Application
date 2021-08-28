'use strict';

import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';

module.exports = {
  description: 'Update category data',
  auth: {
    scope: 'ADMIN'
  },
  validate: {
    payload: Joi.object({
      id: Joi.string().required(),
      name: Joi.string(),
    }),
    failAction: (request, h, err) => err
  },
  handler: async(request, h) => {
    return new Promise((resolve,reject) => {
      const { Category } = request.server.plugins.MongoDB;
      const { id, name } = request.payload;
      async.auto({
        category: async.asyncify(() => Category.Find({id})),
        shouldUpdateCategory: ['category', async.asyncify((results) => {
          if (name) {
            return Category.caseInsensitiveFind({ name }, false).then((categories) => {
              const category = categories && categories[0];
              return !categories || category.id === id;
            });
          }
          return Promise.resolve(true);
        })],
        updatedCategory: ['shouldUpdateCategory', async.asyncify((results) => {
          const { shouldUpdateCategory } = results;
          if (shouldUpdateCategory) {
            const data = Object.assign({}, request.payload, {
              modified_on: Date.now(),
            })
            return Category.Update(id, data);
          }
          return Promise.reject(Boom.badRequest('Category with that name already exists'));
        })],
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results.updatedCategory,
          success: true,
        })
      })
    })
  }
}