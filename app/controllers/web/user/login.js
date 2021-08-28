'use strict';
import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { USER_TYPES } from '../../../libs/constants';

module.exports = {
  description: 'Login User',
  auth: false,
  validate: {
    payload: Joi.object({
      user_type: Joi.string().required().valid(...USER_TYPES),
      phone_number: Joi.string().required(),
      password: Joi.string(),
    }),
    failAction: (request, h, err) => err
  },
  handler: (request, h) => {
    return new Promise((resolve, reject) => {
      const { User } = request.server.plugins.MongoDB;
      const { user_type, phone_number, password } = request.payload;

      async.auto({
        user: async.asyncify(() => {
          const data = Object.assign({
            user_type,
            phone_number,
          });
          return User.complexFind(data, 'Intersection').then(async(users) => {
            const user = users[0];
            user.last_active = Date.now();
            const match = await bcrypt.compare(password, user.password);
            if (match) {
              return User.Update(user.id, user);
            }
            return Promise.reject(Boom.badRequest('Invalid email and / or password'));
          })
        }),
        generateToken:['user', async.asyncify((results) => {
          const { user } = results;
          const token = jwt.sign({
            id: user.id,
            type: user.user_type
          }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 });
          delete user.password;

          return Promise.resolve({
            user,
            token,
          });
        })],
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        } 

        return resolve({
          data: results.generateToken,
          success: true,
        });
      })
    });
  },
};