const datefns = require('date-fns');
const { CHECK_STATUS } = require('../../../definitions/CHECK_STATUS');
const { STATUS_EMOJI } = require('../../../definitions/STATUS_EMOJI');
const { createCheckResult } = require('../models/CheckResult');

module.exports = {
  checkSSLCertExpiry: (cert) => {
    const differenceInDays = datefns.differenceInDays(new Date(cert.valid_to), Date.now());

    const status = getSSLExpiryStatus(differenceInDays);
    const checkResult = createCheckResult('SSL Expiry');
    checkResult.status = status;

    switch (status) {
      case CHECK_STATUS.GOOD:
        checkResult.slackField.value = `${STATUS_EMOJI.GOOD} ${differenceInDays} days`;
        break;
      case CHECK_STATUS.WARNING:
        checkResult.slackField.value = `${STATUS_EMOJI.WARNING} ${differenceInDays} days`;
        break;
      case CHECK_STATUS.DANGER:
        checkResult.slackField.value = ` ${STATUS_EMOJI.DANGER} ${differenceInDays} days`;
        break;
      default:
        checkResult.slackField.value = `${STATUS_EMOJI.DANGER} ${differenceInDays} days`;
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
