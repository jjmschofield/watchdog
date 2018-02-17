const { createCommand } = require('../models/Command');
const { COMMAND_NAMES } = require('../definitions/COMMAND_NAMES');

module.exports = {
  attachCommand: (req, res, next) => {
    const args = getArgs(req);
    const commandName = args[0];
    const url = args[1];

    const command = createCommand(commandName, url);

    if (command.name !== COMMAND_NAMES.HELP && command.url === null) {
      res.status(200).send({ text: 'Whoops! The URL your have provided, is not a valid URL' });
      return;
    }

    if (!req.watchdog) req.watchdog = {};

    req.watchdog.command = command;

    next();
  },
};

function getArgs(req) {
  if (typeof req.body.text !== 'string') return [];

  const args = req.body.text.split(' ');

  const lowercaseArgs = args.map((arg) => {
    return arg.toLowerCase();
  });

  return lowercaseArgs;
}
