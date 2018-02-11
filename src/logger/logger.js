const winston = require("winston");
const correlator = require('correlation-id');
const caller = require('caller');
const level = process.env.LOG_LEVEL || 'debug';

const transports = [
    new winston.transports.Console({
        level: level,
        timestamp: true,
        colorize: true
    })
];

const rewriters = [
    (level, msg, meta) => {
        meta.app = 'watchdog';
        meta.timestamp = Date.now();
        meta.correlationId = correlator.getId();
        meta.caller = caller(5);
        return meta;
    }
];

module.exports = {
    logger: new winston.Logger({
        rewriters,
        transports
    })
};