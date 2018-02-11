const https = require('https');

const { logger } = require('../../../logger/logger');

module.exports = {
  getSSL,
};

async function getSSL(url) {
  const options = {
    host: url.replace('https://', '').replace('http://', ''),
    port: 443,
    method: 'GET',
    rejectUnauthorized: false,
  };

  return new Promise((resolve, reject) => {
    logger.info(`Making SSL Certificate Request to ${url}`);

    const req = https.request(options, (res) => {
      const sslCert = res.connection.getPeerCertificate();
      resolve(sslCert);
    });

    req.end();

    req.on('error', (error) => {
      logger.info(`Failed to Recieve SSL Certificate fo ${url}`, error);
      reject({ status: 504 });
    });
  });
}
