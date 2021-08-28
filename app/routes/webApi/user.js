'use strict';

exports.plugin = {  
  pkg: require('../../../package.json'),
  name : 'user_routes',
  register: async (server, options) => {
    const Controllers = {
      login: require('../../controllers/web/user/login'),
      signup: require('../../controllers/web/user/signup'),
      update: require('../../controllers/web/user/update'),
      delete: require('../../controllers/web/user/delete'),
      index: require('../../controllers/web/user/index'),
    };
    server.route([{
      method: 'POST',
      path: '/login',
      config: Controllers.login
    }, {
      method: 'POST',
      path: '/signup',
      config: Controllers.signup,
    }, {
      method: 'PUT',
      path: '/update',
      config: Controllers.update,
    }, {
      method: 'DELETE',
      path: '/delete',
      config: Controllers.delete,
    }, {
      method: 'GET',
      path: '/',
      config: Controllers.index,
    }]);
  }
};