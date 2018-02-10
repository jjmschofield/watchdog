const dotenv = require('dotenv');
const server = require('./server');

loadEnvironmentVariables();
startServer();

function loadEnvironmentVariables(){
    const loadedConfig = dotenv.config();

    if(!loadedConfig.error){
        console.log('Loaded environment variables from .env', Object.keys(loadedConfig.parsed));
    }
    else {
        console.warn(loadedConfig.error.message);
    }
}

function startServer(){
    server.init();
}


