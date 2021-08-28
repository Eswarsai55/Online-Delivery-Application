'use strict';

exports.plugin = {  
  pkg: require('../../../package.json'),
  name : 'order_routes',
  register: async (server, options) => {
    const Controllers = {
      index: require('../../controllers/web/order/index'),
      create: require('../../controllers/web/order/create'),
      delete: require('../../controllers/web/order/delete'),
      update: require('../../controllers/web/order/update'),
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