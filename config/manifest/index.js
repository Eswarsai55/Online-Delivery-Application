import commonModules from './commonModules';
import webModules from './webModules';

module.exports = function () {
  const { DAEMON_OR_WEB = 'both', NODE_ENVIRONMENT, SERVER_HOST, SERVER_PORT } = process.env;
  console.log('NODE_ENVIRONMENT:' + NODE_ENVIRONMENT);

  const plugins = commonModules.concat(webModules);
  console.log('-----------------Modules------------')
  plugins.map(r => {
    console.log(r.plugin)
  });
  console.log('-----------------Modules------------')

  const manifest = {
    server: {
      port: SERVER_PORT,
      host: SERVER_HOST,
    },
    register: {
      plugins,
    }
  };

  return manifest;
}