'use strict';

exports.plugin = {  
  pkg: require('../../../package.json'),
  name : 'menu_routes',
  register: async (server, options) => {
    const Controllers = {
      index: require('../../controllers/web/menu/index'),
      create: require('../../controllers/web/menu/create'),
      delete: require('../../controllers/web/menu/delete'),
      update: require('../../controllers/web/menu/update'),
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