const dotenv = require('dotenv');
const server = require('./server');

loadEnvironmentVariables();
startServer();

function loadEnvironmentVariables(){
    const loadedConfig = dotenv.config();
    console.log('Loaded environment variables from .env', Object.keys(loadedConfig.parsed));
}

function startServer(){
    server.init();
}


