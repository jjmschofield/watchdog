const fetch = require('isomorphic-fetch');
const validator = require('validator');

const { CHECK_STATUS } = require('../../definitions/CHECK_STATUS');
const { createCheckResult } = require('./models/CheckResult');
const { createCheckSlackResponse } = require('./models/CheckSlackResponse');

module.exports = {
  doCheck: async (commandArgs) => {
    const url = commandArgs[0];

    if (url && !isAllowedUrl(url)) {
      return Promise.reject({ status: 400, message: 'Invalid URL provided' });
    }

    if (url) {
      try {
        const fetchResult = await fetch(`${url}`);

        const checks = [
          checkStatusIsOK(fetchResult),
          // domain name expiry
          // SSL cert expiry
          // Cipher level
        ];

        const result = createCheckSlackResponse(checks, url);

        return result;
      }
      catch (error) {
        return Promise.reject(error);
      }
    }

    return null;
  },
};

function checkStatusIsOK(fetchResult) {
  const checkResult = createCheckResult('Request Status Check');

  if (fetchResult.ok === true) {
    checkResult.slackField.value = `:white_check_mark: ${fetchResult.status} ${fetchResult.statusText}`;
    checkResult.status = CHECK_STATUS.GOOD;
  }
  else {
    checkResult.slackField.value = `:rotating_light: ${fetchResult.status} ${fetchResult.statusText}`;
    checkResult.status = CHECK_STATUS.DANGER;
  }

  return checkResult;
}

function isAllowedUrl(url) {
  return typeof url === 'string'
    && validator.isURL(url)
    && validator.isFQDN(url.replace('http://', '').replace('https://', ''))
    && !validator.contains(url, 'localhost')
    && !validator.contains(url, '127.0.0.1');
}
