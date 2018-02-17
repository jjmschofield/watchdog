const fetch = require('isomorphic-fetch');
const { checkResponseStatus } = require('./checks/checkResponseStatus');
const { checkSSLCertExpiry } = require('./checks/checkSSLCertExpiry');
const { createCheckSlackResponse } = require('./models/CheckSlackResponse');
const requestHelper = require('../utils/httpsRequestHelper');

module.exports = {
  doCheck: async (command) => {
    if (command.url) {
      try {
        const checks = await runChecks(command.url);

        return createCheckSlackResponse(checks, command.url);
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

