const { CHECK_STATUS } = require('../../../definitions/CHECK_STATUS');
const { STATUS_EMOJI } = require('../../../definitions/STATUS_EMOJI');
const { createCheckResult } = require('../models/CheckResult');

module.exports = {
  checkResponseStatus: (fetchResult) => {
    const checkResult = createCheckResult('Response Status');

    if (fetchResult.ok === true) {
      checkResult.slackField.value = `${STATUS_EMOJI.GOOD} ${fetchResult.status} ${fetchResult.statusText}`;
      checkResult.status = CHECK_STATUS.GOOD;
    }
    else {
      checkResult.slackField.value = `${STATUS_EMOJI.DANGER} ${fetchResult.status} ${fetchResult.statusText}`;
      checkResult.status = CHECK_STATUS.DANGER;
    }

    return checkResult;
  },
};
