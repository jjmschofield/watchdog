const express = require('express');
const {slackAuthentication} = require('./middleware/authenticate');
const {COMMAND_TYPES} = require('./definitions/COMMAND_TYPES');
const {getHelpText} = require('./handlers/help');

module.exports = {
    createCommandRouter
};

function createCommandRouter() {
    const router = express.Router();

    router.use(slackAuthentication);

    router.post('/', commandController);

    return router;
}

function commandController(req, res) {

    console.log(req.body);


    const args = req.body.text.split(' ');
    const lowercaseArgs = args.map(arg => arg.toLowerCase());

    const command = lowercaseArgs[0];

    let handler;
    switch (command) {
        case COMMAND_TYPES.HELP :
            handler = getHelpText;
            break;
        default :
            handler = getHelpText;
    }

    handler()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(error.status || 500).send(error.message);
        });

}
