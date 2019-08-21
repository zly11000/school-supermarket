/* eslint valid-jsdoc: "off" */
const addControllerRules = require('../utils/validator')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1565332295786_1141';

  // add your middleware config here
  config.middleware = ['loginAuthority'];
  config.multipart = {
    mode: 'file',
  };

  config.cluster = {
    listen: {
      port: 7002
    }
  };
  // csrf 暂时关闭
  config.security = {
    csrf: {
      enable: false
    },
  };

  // mysql options
  config.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'duodian'
    }
  };
  // add your user config here
  const userConfig = {
    addControllerRules
  };

  return {
    ...config,
    ...userConfig,
  };
};
