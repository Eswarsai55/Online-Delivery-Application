'use strict';

import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';
import { PAYMENT_TYPES, ORDER_STATUS } from '../../../libs/constants';

module.exports = {
  description: 'Update order data',
  validate: {
    payload: Joi.object({
      id: Joi.string().required(),
      payment_method: Joi.string().valid(...PAYMENT_TYPES),
      status: Joi.string().valid(...ORDER_STATUS),
      ordered_items: Joi.array().items({
        menu_id: Joi.string(),
        menu_name: Joi.string(),
        count: Joi.number(),
        unit_price: Joi.number(),
      }),
      delivery_person_id: Joi.string(),
    }),
    failAction: (request, h, err) => err
  },
  handler: async(request, h) => {
    return new Promise((resolve,reject) => {
      const { Order, User } = request.server.plugins.MongoDB;
      const { id, delivery_person_id, status } = request.payload;
      const { userId } = request.auth.credentials;
      async.auto({
        user: async.asyncify(() => User.Find({id: userId}).then(users => users[0])),
        order: async.asyncify(() => Order.Find({id})),
        isDeliveryGuy: ['user', async.asyncify((results) => {
          const { user } = results;
          return user.user_type === 'DELIVERY';
        })],
        updateDeliveryPersonId: ['user', async.asyncify((results) => {
          const { user } = results;
          if(delivery_person_id) {
            if (user.user_type === 'ADMIN') {
              const data = Object.assign({}, {
                id: delivery_person_id,
              })
              return User.Find(data).then(users => {
                const user = users[0];
                return user.user_type === 'DELIVERY'
              });
            }
            return Promise.reject(Boom.badRequest("Only admin has rights to update the delivery person"))
          }
          return Promise.resolve(true);
          
        })],
        updateOrderStatus: ['isDeliveryGuy', async.asyncify((results) => {
          const { isDeliveryGuy } = results;
          if (status) {
            if(isDeliveryGuy) {
              const data = Object.assign({}, request.payload, {
                modified_on: Date.now(),
              })
              return Order.Update(id, data);
            }
            return Promise.reject(Boom.badRequest('Only delivery person will be able to change the order status'));
          }
          return Promise.resolve(true)
          
        })],
        updatedOrder: ['order', async.asyncify((results) => {
          if (!delivery_person_id && !status) {
            const data = Object.assign({}, request.payload, {
              modified_on: Date.now(),
            })
            return Order.Update(id, data);
          }
          return 
        })],
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results.updatedOrder,
          success: true,
        })
      })
    })
  }
}