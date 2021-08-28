const COMMON_MODULES = [{
  plugin: 'blipp',
  options: {
    showAuth: true,
    showStart: true,
    showScope: true,
  }
}, {
  plugin: './plugins/mongo',
}, {
  plugin: './plugins/jwt'
}];

export default COMMON_MODULES;