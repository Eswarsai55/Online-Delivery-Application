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
      async.auto({
        order: async.asyncify(() => Order.Find({id})),
        validDeliveryPersonId: async.asyncify(() => {
          if (delivery_person_id) {
            const data = Object.assign({}, {
              id: delivery_person_id,
            })
            return User.Find(data).then(users => {
              const user = users[0];
              return user.user_type === 'DELIVERY'
            });
          }
          return Promise.resolve(true);
        }),
        updateOrderStatus: ['validDeliveryPersonId', async.asyncify((results) => {
          const { validDeliveryPersonId } = results;
          if (status) {
            if(validDeliveryPersonId) {
              const data = Object.assign({}, request.payload, {
                modified_on: Date.now(),
              })
              return Order.Update(id, data);
            }
          }
          return Promise.reject(Boom.badRequest('Only delivery person will be able to change the order status'));
        })],
        updatedOrder: ['order', 'validDeliveryPersonId', async.asyncify((results) => {
          const { validDeliveryPersonId } = results;
          if (validDeliveryPersonId) {
            const data = Object.assign({}, request.payload, {
              modified_on: Date.now(),
            })
            return Order.Update(id, data);
          }
          return Promise.reject(Boom.badRequest("Delivery Person not found"))
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