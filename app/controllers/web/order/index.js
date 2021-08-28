'use strict';

import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';

module.exports = {
  description: "Order data",
  auth: false,
  validate: {
    query: Joi.object({
      id: Joi.string().optional(),
      phone_number: Joi.string().optional(),
    }),
    failAction: (request, h, err) => err
  },
  handler: async(request, h) => {
    return new Promise((resolve, reject) => {
      const { Order, User } = request.server.plugins.MongoDB;
      const { phone_number } = request.query;
      async.auto({
        user: async.asyncify(() => {
          if (phone_number) {
            return User.Find({phone_number}).then(users => users[0])
          }
          return Promise.resolve(true);
        }),
        order: ['user', async.asyncify((results) => {
          const { user } = results;
          if (phone_number) {
            return Order.Find({customer_id: user.id})
          }
          return Order.Find(request.query)
        })]
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results.order,
          success: true,
        })
      })
    })
  }
}