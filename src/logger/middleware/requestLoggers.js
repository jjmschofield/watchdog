const morgan = require('morgan');
const { logger } = require('../logger');

let morganLoggerLevel;

if (process.env.NODE_ENV === 'production') {
  morganLoggerLevel = 'combined';
}
else {
  morganLoggerLevel = 'dev';
}

const morganStandardConfig = {
  skip(req, res) {
    return res.statusCode >= 500;
  },
  stream: {
    write: (message) => {
      logger.info(message);
    },
  },
};

const morganErrorConfig = {
  skip(req, res) {
    return res.statusCode < 500;
  },
  stream: {
    write: (message) => {
      logger.error(message);
    },
  },
};

module.exports = {
  logRequestStandard: morgan(morganLoggerLevel, morganStandardConfig),
  logRequestError: morgan(morganLoggerLevel, morganErrorConfig),
};

