const { init } = require('./server');
const { logger } = require('./logger/logger');
const { loadEnvironmentVariables } = require('./config/envLoader');

logger.info('Starting Watchdog - woof woof!');
loadEnvironmentVariables();
init();
