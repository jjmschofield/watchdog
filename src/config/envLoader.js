const dotenv = require('dotenv');
const { logger } = require('../logger/logger');

module.exports = {
  loadEnvironmentVariables: () => {
    const loadedConfig = dotenv.config();

    if (!loadedConfig.error) {
      logger.info('Loaded environment variables from .env', {
        envVars: Object.keys(loadedConfig.parsed),
      });
    }
    else {
      logger.warn(loadedConfig.error.message);
    }
  },
};
