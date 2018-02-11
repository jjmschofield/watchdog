const fetch = require('isomorphic-fetch');

const { isAllowedUrl } = require('../utils/validators');
const { checkResponseStatus } = require('./checks/checkResponseStatus');
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
          checkResponseStatus(fetchResult),
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
