'use strict';
import Joi from '@hapi/joi';
import Boom from 'boom';
import async from 'async';

module.exports = {
  description: 'Update user specific data',
  validate: {
    payload: Joi.object({
      id: Joi.string().required(),
      first_name: Joi.string(),
      last_name: Joi.string(),
      email: Joi.string(),
      phone_number: Joi.string(),
    }),
    failAction: (request, h, err) => err
  },
  handler: (request, h) => {
    return new Promise((resolve, reject) => {
      const { User } = request.server.plugins.MongoDB;
      const { id, email, phone_number } = request.payload;

      async.auto({
        user: async.asyncify(() => {
          return User.Find({id}).then(users => users[0]);
        }),
        duplicateUser:['user', async.asyncify(() => {
          if (email || phone_number) {
            const email = email ? email : user.email;
            const phone_number = phone_number ? phone_number : user.phone_number;
            const data = {
              email,
              phone_number
            }
            return User.Find(data, 'Intersection', false).then(users => {
              const user = users && users[0];
              return !users || user.id == id;
            })
          }
          return Promise.resolve(true);
        })],
        updatedUser:['duplicateUser', async.asyncify((results) => {
          const { duplicateUser } = results;
          if (duplicateUser) {
            const data = Object.assign({},request.payload, {
              modified_on: Date.now(),
            });
            
            delete data.id;
            return User.Update(id, data);
          }
          return Promise.reject(Boom.badRequest('User with email or phone number already exists'));
        })],
      }, (err, results) => {
        if (err) {
          console.log(err);
          return reject(err.isBoom ? err : Boom.boomify(err));
        } 
        return resolve({
          data: results.updatedUserData,
          success: true,
        });
      })
    });
  },
};