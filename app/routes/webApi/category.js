'use strict';

exports.plugin = {  
  pkg: require('../../../package.json'),
  name : 'category_routes',
  register: async (server, options) => {
    const Controllers = {
      index: require('../../controllers/web/category/index'),
      create: require('../../controllers/web/category/create'),
      delete: require('../../controllers/web/category/delete'),
      update: require('../../controllers/web/category/update'),
    };
    server.route([{
      method: 'GET',
      path: '/',
      config: Controllers.index,
    }, {
      method: 'POST',
      path: '/add',
      config: Controllers.create,
    }, {
      method: 'DELETE',
      path: '/delete',
      config: Controllers.delete,
    }, {
      method: 'PUT',
      path: '/update',
      config: Controllers.update,
    }]);
  }
};