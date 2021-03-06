const { getConfig } = require('../../config/config');
const { logger } = require('../../logger/logger');


module.exports = {
  slackAuthentication: (req, res, next) => {
    const slackSecret = getConfig().slackCommandToken;

    if (typeof slackSecret !== 'string') {
      res.status(503).send();
      logger.warn('SLACK_COMMAND_TOKEN not set. Sending 503.');
      return;
    }

    const payload = req.body;

    if (payload && payload.token === slackSecret) {
      next();
    }
    else {
      res.status(401).send();
    }
  },
};
