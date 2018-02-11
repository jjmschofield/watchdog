const dotenv = require('dotenv');
const server = require('./server');
const {logger} = require('./logger/logger');

loadEnvironmentVariables();
startServer();

function loadEnvironmentVariables(){
    const loadedConfig = dotenv.config();

    if(!loadedConfig.error){
        logger.info('Loaded environment variables from .env', {
            envVars: Object.keys(loadedConfig.parsed)
        });
    }
    else {
        logger.warn(loadedConfig.error.message);
    }
}

function startServer(){
    server.init();
}


