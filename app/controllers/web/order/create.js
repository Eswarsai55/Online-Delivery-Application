'use strict';

import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';
import { PAYMENT_TYPES, ORDER_STATUS } from '../../../libs/constants';
// import OrderPlaced from './notification/orderReceivedNotification';

module.exports = {
  description: 'Add new Order',
  validate: {
    payload: Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
      phone_number: Joi.number().required(),
      email: Joi.string().required(),
      payment_method: Joi.string().required().valid(...PAYMENT_TYPES),
      ordered_items: Joi.array().items({
        menu_id: Joi.string().required(),
        menu_name: Joi.string().required(),
        count: Joi.number().required(),
      }),
    }),
    failAction: (request, h, err) => err
  },
  handler: async(request,h) => {
    const { Order, Menu } = request.server.plugins.MongoDB;
    const { ordered_items } = request.payload;
    const { userId } = request.auth.credentials;
    return new Promise((resolve, reject) => {
      async.auto({
        updatedItems: async.asyncify(() => {
          return Promise.all(ordered_items.map(async(order) => {
            const { menu_id } = order;
            return Menu.Find({id: menu_id}).then((menu) => {
              const { available_at } = menu[0];
              return Object.assign({}, order, {
                "pickup_location": available_at[Math.floor(Math.random() * available_at.length)]
              })
            });
          }))
        }),
        order: ['updatedItems', async.asyncify((results) => {
          const { updatedItems } = results;
          const data = Object.assign({}, request.payload, {
            status: 'Task Created',
            customer_id: userId,
            ordered_items: updatedItems
          })
          return Order.Save(data);
        })],
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results.order,
          success: true,
        });
      })
    })
  },
}