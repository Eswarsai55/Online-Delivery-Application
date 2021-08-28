const WEB_MODULES = [{
  plugin: './../app/routes/webApi/category.js',
  routes: {
    prefix: '/api/organization/category'
  }
}, {
  plugin: './../app/routes/webApi/menu.js',
  routes: {
    prefix: '/api/organization/menu'
  }
}, {
  plugin: './../app/routes/webApi/order.js',
  routes: {
    prefix: '/api/organization/order'
  }
}, {
  plugin: './../app/routes/webApi/user.js',
  routes: {
    prefix: '/api/organization/user'
  }
}];

export default WEB_MODULES;