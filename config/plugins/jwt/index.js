'use strict'
import jwt from 'hapi-auth-jwt2';

function validate (decoded, request) {
  if (decoded.type === 'CUSTOMER' || decoded.type === 'ADMIN' || decoded.type === 'CP') {
    let data = {
      isValid: true,
      credentials: {
        scope: decoded.type,
        userId: decoded.id,
      }
    }
    return data
  }
  return {isValid: false}
}

async function register(server, options) {
  await server.register(jwt);
  await server.auth.strategy('jwt', 'jwt', {
    key: process.env.SECRET_KEY,
    validate: validate,
    verifyOptions: {algorithms: ['HS256']}
  })
  server.auth.default('jwt')
}

exports.plugin = {
  register,
  name: 'auth-jwt'
}