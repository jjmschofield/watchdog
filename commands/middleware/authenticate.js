const {getConfig} = require('../../config/config');

module.exports = {
    slackAuthentication: (req, res, next) => {
        const payload = req.body;

        console.log(payload);

        if (payload && payload.token === getConfig().slackCommandToken) {
            next();
        }
        else {
            res.status(401).send();
        }
    }
};