const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 5000;
const {createCommandRouter} = require('./commands/router');

module.exports = {
    init
};

function init() {
    const app = createExpressApp();
    configureViewRenderer(app);
    registerDefaultRoute(app);
    registerCommandRouter(app);
    startListening(app);
}

function createExpressApp() {
    return express();
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