const { logger } = require('../../logger/logger');
const { getCommandHandler } = require('../models/Command');

module.exports = {
  commandController: (req, res) => {
    logger.silly(req.body);

    const handler = getCommandHandler(req.watchdog.command);

    handler(req.watchdog.command)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(error.status || 500).send(error.message);
      });
  },
};
