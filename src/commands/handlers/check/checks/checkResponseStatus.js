const { CHECK_STATUS } = require('../../../definitions/CHECK_STATUS');
const { createCheckResult } = require('../models/CheckResult');

module.exports = {
  checkResponseStatus: (fetchResult) => {
    const checkResult = createCheckResult('Response Status');

    if (fetchResult.ok === true) {
      checkResult.slackField.value = `:white_check_mark: ${fetchResult.status} ${fetchResult.statusText}`;
      checkResult.status = CHECK_STATUS.GOOD;
    }
    else {
      checkResult.slackField.value = `:rotating_light: ${fetchResult.status} ${fetchResult.statusText}`;
      checkResult.status = CHECK_STATUS.DANGER;
    }

    return checkResult;
  },
};
