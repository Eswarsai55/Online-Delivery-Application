'use strict';

import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';

module.exports = {
  description: "Order data",
  validate: {
    query: Joi.object({
      id: Joi.string().optional(),
    }),
    failAction: (request, h, err) => err
  },
  handler: async(request, h) => {
    return new Promise((resolve, reject) => {
      const { Order, User } = request.server.plugins.MongoDB;
      const { userId } = request.auth.credentials;
      async.auto({
        user: async.asyncify(() => User.Find({id: userId}).then(users => users[0])),
        order: ['user', async.asyncify((results) => {
          const { user } = results;
          let data = Object.assign({}, request.query)
          if (user.user_type === 'ADMIN') {
            return Order.Find(request.query)
          } else if (user.user_type === 'DELIVERY') {
            data.delivery_person_id = user.id;
            return Order.complexFind(data, 'Intersection');
          } else if(user.user_type === "CUSTOMER") {
            data.customer_id = user.id;
            return Order.complexFind(data, 'Intersection');
          }
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