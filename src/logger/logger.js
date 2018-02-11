const winston = require('winston');
const correlator = require('correlation-id');
const caller = require('caller');

const logLevel = process.env.LOG_LEVEL || 'debug';

const transports = [
  new winston.transports.Console({
    level: logLevel,
    timestamp: true,
    colorize: true,
  }),
];

const rewriters = [
  (level, msg, meta) => {
    const updatedMeta = Object.assign({}, meta);
    updatedMeta.app = 'watchdog';
    updatedMeta.timestamp = Date.now();
    updatedMeta.correlationId = correlator.getId();
    updatedMeta.caller = caller(5);
    return updatedMeta;
  },
];

module.exports = {
  logger: new winston.Logger({
    rewriters,
    transports,
  }),
};
