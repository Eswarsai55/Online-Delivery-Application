'use strict';

import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';

module.exports = {
  description: 'Add new Menu',
  auth: {
    scope: 'ADMIN'
  },
  validate: {
    payload: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().optional(),
      thumbnail: Joi.string().optional(),
      category_id: Joi.string().required(),
      description: Joi.string().optional(),
      available_at: Joi.array().items(Joi.string().required())
    }),
    failAction: (request, h, err) => err
  },
  handler: async(request,h) => {
    const { Menu, Category} = request.server.plugins.MongoDB;
    const { name, category_id } = request.payload;
    return new Promise((resolve, reject) => {
      async.auto({
        duplicateMenu: async.asyncify(() => {
          return Menu.caseInsensitiveFind({name}, false);
        }),
        validCategory: async.asyncify(() => {
          const data = {
            id: category_id,
          }
          return Category.Find(data).then(result => result[0]);
        }),
        saveMenu: ['duplicateMenu', 'validCategory', async.asyncify(results => {
          const { duplicateMenu, validCategory } = results;
          if (!duplicateMenu && validCategory) {
            return Menu.Save(request.payload);;
          }
          return Promise.reject(Boom.badRequest('Menu already exists'));
        })],

      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results.saveMenu,
          success: true,
        });
      })
    })
  },
}