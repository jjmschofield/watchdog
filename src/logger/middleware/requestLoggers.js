const morgan = require('morgan');

let morganLoggerLevel;

if (process.env === 'production') {
  morganLoggerLevel = 'combined';
}
else {
  morganLoggerLevel = 'dev';
}

const morganStandardConfig = {
  skip(req, res) {
    return res.statusCode >= 500;
  },
  stream: process.stdout,
};

const morganErrorConfig = {
  skip(req, res) {
    return res.statusCode < 500;
  },
  stream: process.stderr,
};

module.exports = {
  logRequestStandard: morgan(morganLoggerLevel, morganStandardConfig),
  logRequestError: morgan(morganLoggerLevel, morganErrorConfig),
};

