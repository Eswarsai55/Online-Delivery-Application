'use strict';
import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';
import bcrypt from 'bcrypt';
import { USER_TYPES } from '../../../libs/constants';

module.exports = {
  description: 'Create User account',
  auth: false,
  validate: {
    payload: Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone_number: Joi.string().required(),
      password: Joi.string().required(),
      user_type: Joi.string().required().valid(...USER_TYPES),
    }),
    failAction: (request, h, error) => error,
  },
  handler: (request, h) => {
    return new Promise((resolve, reject) => {
      const { User } = request.server.plugins.MongoDB;
      const { email, phone_number, user_type, password } = request.payload;
      async.auto({
        user: async.asyncify(() => {
          const data = Object.assign({}, {
            email,
            phone_number,
            user_type,
          })
          return User.complexFind(data, 'Intersection', false)
        }),
        newPassword: async.asyncify(() => {
          return bcrypt.hash(password, 0);
        }),
        updatedUser: ['user', 'newPassword', async.asyncify((results) => {
          const { user, newPassword } = results;
          let data = Object.assign({}, request.payload, {
            signed_up: true,
            signed_up_at: Date.now(),
            password: newPassword
          });
          if (!user) {
            return User.Save(data);
          }
          return Promise.reject(Boom.badRequest('Account Already Exists with that email and / or phone_number'))
        })],
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve({
          data: results.updatedUser,
          success: true,
        });
      })
    });
  },
};