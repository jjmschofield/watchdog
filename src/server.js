const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const {logger} = require('./logger/logger');
const {logRequestStandard, logRequestError} = require('./logger/middleware/requestLoggers');
const {setCorrelationId} = require('./logger/middleware/correlationId');

const {createCommandRouter} = require('./commands/router');

const PORT = process.env.PORT || 5000;

module.exports = {
    init
};

function init() {
    const app = createExpressApp();

    registerBodyParserMiddleware(app);
    registerLoggerMiddleware(app);
    registerSecurityMiddleware(app);

    configureViewRenderer(app);

    registerDefaultRoute(app);
    registerCommandRouter(app);

    startListening(app);
}

function createExpressApp() {
    return express();
}

function registerLoggerMiddleware(app) {
    app.use(setCorrelationId);
    app.use(logRequestStandard);
    app.use(logRequestError);
}

function registerSecurityMiddleware(app) {
    app.use(helmet()); // Sets a range of headers to protect the server and users, main benefit is for browsers - but we include it for belts and braces
}

function registerBodyParserMiddleware(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
}

function registerDefaultRoute(app) {
    app.get('/', (req, res) => {
        res.render('index');
    });
}

function registerCommandRouter(app) {
    app.use('/commands', createCommandRouter());
}

function startListening(app) {
    app.listen(PORT, () => logger.info(`Watchdog listening on ${ PORT }`));
}

function configureViewRenderer(app) {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'public/views'));
}