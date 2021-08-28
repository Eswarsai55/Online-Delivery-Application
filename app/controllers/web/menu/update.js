'use strict';

import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';

module.exports = {
  description: 'Update menu data',
  auth: {
    scope: 'ADMIN'
  },
  validate: {
    payload: Joi.object({
      id: Joi.string().required(),
      name: Joi.string().optional(),
      price: Joi.number().optional(),
      thumbnail: Joi.string().optional(),
      category_id: Joi.string().optional(),
      description: Joi.string().optional(),
      vendor_id: Joi.string().optional(),
      popular: Joi.boolean().optional(),
    }),
    failAction: (request, h, err) => err
  },
  handler: async(request, h) => {
    return new Promise((resolve,reject) => {
      const { Menu, Category } = request.server.plugins.MongoDB;
      const { id, name, category_id } = request.payload;
      async.auto({
        menu: async.asyncify(() => Menu.Find({id})),
        validateMenu: ['menu', async.asyncify((results) => {
          const data = {
            category_id,
            name,
          }
          if (name) {
            return Menu.complexFind(data, 'Intersection', false).then((results) => {
              const menu = results && results[0];
              return !results || menu.id === id;
            });
          }
          return Promise.resolve(true);
        })],
        validCategory: async.asyncify(() => {
          if (category_id) {
            const data = {
              id: category_id,
            }
            return Category.Find(data).then(result => result[0]);
          }
          return Promise.resolve(true)
        }),
        updatedMenu: ['validateMenu', 'validCategory', async.asyncify((results) => {
          const { validateMenu, validCategory } = results;
          const data = Object.assign({}, request.payload, {
            modified_on: Date.now(),
          })
          if (validateMenu && validCategory) {
            return Menu.Update(id, data);
          }
          return Promise.reject(Boom.badRequest('Menu with that name and same category already exists'));
        })],
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results.updatedMenu,
          success: true,
        })
      })
    })
  }
}