const validator = require('validator');

module.exports = {
  isAllowedUrl: (url) => {
    return typeof url === 'string'
      && validator.isURL(url)
      && validator.isFQDN(url.replace('http://', '').replace('https://', ''))
      && !validator.contains(url, 'localhost')
      && !validator.contains(url, '127.0.0.1');
  },
};
