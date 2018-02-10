const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {createCommandRouter} = require('./commands/router');

const PORT = process.env.PORT || 5000;

module.exports = {
    init
};

function init() {
    const app = createExpressApp();

    registerLoggerMiddleware(app);
    registerBodyParser(app);

    configureViewRenderer(app);

    registerDefaultRoute(app);
    registerCommandRouter(app);

    startListening(app);
}

function createExpressApp() {
    return express();
}

function registerLoggerMiddleware(app){
    app.use(morgan('tiny'));
}

function registerBodyParser(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))
}

function registerDefaultRoute(app) {
    app.get('/', (req, res) => {
        res.render('index');
    });
}

function registerCommandRouter(app){
    app.use('/commands', createCommandRouter());
}

function startListening(app) {
    app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
}

function configureViewRenderer(app) {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'public/views'));
}