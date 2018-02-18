const { COMMAND_NAMES } = require('../definitions/COMMAND_NAMES');
const { isAllowedUrl } = require('../utils/validators');
const { getHelpText } = require('../handlers/help/help');
const { doCheck } = require('../handlers/check/check');

class Command {
  constructor(name, url) {
    this.name = getCommandName(name);
    this.url = getUrl(url);
    Object.freeze(this);
  }
}

function getCommandName(name) {
  if (isValidCommandName(name)) {
    return name;
  }
  return COMMAND_NAMES.HELP;
}

function isValidCommandName(name) {
  return Object.values(COMMAND_NAMES).indexOf(name) > -1;
}

function getUrl(url) {
  if (isAllowedUrl(url)) {
    return url;
  }
  else if (url) {
    return null;
  }
  return undefined;
}

module.exports = {
  createCommand: (name, url) => {
    return new Command(name, url);
  },
  getCommandHandler: (command) => {
    let handler;
    switch (command.name) {
      case COMMAND_NAMES.HELP:
        handler = getHelpText;
        break;
      case COMMAND_NAMES.CHECK:
        handler = doCheck;
        break;
      default:
        handler = getHelpText;
    }

    return handler;
  },
};
