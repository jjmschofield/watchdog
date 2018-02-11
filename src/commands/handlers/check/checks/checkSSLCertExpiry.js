/* eslint-disable no-trailing-spaces */
const datefns = require('date-fns');
const { CHECK_STATUS } = require('../../../definitions/CHECK_STATUS');
const { createCheckResult } = require('../models/CheckResult');

module.exports = {
  checkSSLCertExpiry: (cert) => {
    const differenceInDays = datefns.differenceInDays(new Date(cert.valid_to), Date.now());

    const status = getSSLExpiryStatus(differenceInDays);
    const checkResult = createCheckResult('SSL Expiry');
    checkResult.status = status;

    switch (status) {
      case CHECK_STATUS.GOOD:
        checkResult.slackField.value = `:white_check_mark: ${differenceInDays} days`;
        break;
      case CHECK_STATUS.WARNING:
        checkResult.slackField.value = `:warning: ${differenceInDays} days`;
        break;
      case CHECK_STATUS.DANGER:
        checkResult.slackField.value = `:rotating_light: ${differenceInDays} days`;
        break;
      default:
        checkResult.slackField.value = `:rotating_light: ${differenceInDays} days`;
    }

    return checkResult;
  },
};

function getSSLExpiryStatus(differenceInDays) {
  if (differenceInDays >= 30) {
    return CHECK_STATUS.GOOD;
  }
  else if (differenceInDays > 7) {
    return CHECK_STATUS.WARNING;
  }
  return CHECK_STATUS.DANGER;
}
