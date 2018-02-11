const fetch = require('isomorphic-fetch');

const { isAllowedUrl } = require('../utils/validators');
const { checkResponseStatus } = require('./checks/checkResponseStatus');
const { checkSSLCertExpiry } = require('./checks/checkSSLCertExpiry');
const { createCheckSlackResponse } = require('./models/CheckSlackResponse');
const requestHelper = require('../utils/httpsRequestHelper');

module.exports = {
  doCheck: async (commandArgs) => {
    const url = commandArgs[0];

    if (url && !isAllowedUrl(url)) {
      return Promise.reject({ status: 400, message: 'Invalid URL provided' });
    }

    if (url) {
      try {
        const checks = await runChecks(url);

        return createCheckSlackResponse(checks, url);
      }
      catch (error) {
        return Promise.reject(error);
      }
    }

    return null;
  },
};

async function runChecks(url) {
  const fetchResult = await fetch(url);
  const cert = await requestHelper.getSSL(url);

  return [
    checkResponseStatus(fetchResult),
    checkSSLCertExpiry(cert),
    // domain name expiry
    // SSL cert expiry
    // Cipher level
  ];
}

