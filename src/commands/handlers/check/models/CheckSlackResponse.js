const { CHECK_STATUS } = require('../../../definitions/CHECK_STATUS');
const { COLOURS } = require('../../../definitions/COLOURS');

class CheckSlackResponse {
  constructor(checks, url) {
    const urlStatus = getUrlStatus(checks);
    const urlStatusColour = getUrlStatusColour(urlStatus);

    this.text = ':dog: WOOF WOOF! Can I have a biscuit now?';
    this.attachments = [
      {
        title: url.toUpperCase(),
        title_link: `${url}`,
        color: urlStatusColour,
        fields: getSlackFields(checks),
      },
    ];
  }
}

module.exports = {
  createCheckSlackResponse: (checks, url) => {
    return new CheckSlackResponse(checks, url);
  },
};

function getUrlStatus(checks) {
  return checks.reduce((result, check) => {
    if (check.status > result) {
      return check.status;
    }

    return result;
  }, 0);
}

function getUrlStatusColour(status) {
  switch (status) {
    case CHECK_STATUS.GOOD:
      return COLOURS.GOOD;
    case CHECK_STATUS.WARNING:
      return COLOURS.WARNING;
    case CHECK_STATUS.DANGER:
      return COLOURS.DANGER;
    default:
      return COLOURS.WARNING;
  }
}

function getSlackFields(checks) {
  return checks.map((check) => {
    return check.slackField;
  });
}
