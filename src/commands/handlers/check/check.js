const fetch = require('isomorphic-fetch');
const validator = require('validator');

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


function isAllowedUrl(url) {
  return typeof url === 'string'
    && validator.isURL(url)
    && validator.isFQDN(url.replace('http://', '').replace('https://', ''))
    && !validator.contains(url, 'localhost')
    && !validator.contains(url, '127.0.0.1');
}
