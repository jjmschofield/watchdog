const fetch = require('isomorphic-fetch');

const {CHECK_STATUS} = require('../definitions/CHECK_STATUS');
const {COLOURS} = require('../definitions/COLOURS');
const {createCheckResult} = require('../models/CheckResult');


module.exports = {
    doCheck: async (commandArgs) => {
        const url = commandArgs[0];

        if (typeof url === 'string') {
            try {

                const fetchResult = await fetch(`${url}`);

                const checks = [
                    checkStatusIsOK(fetchResult),
                    //domain name expiry
                    //SSL cert expiry
                    //Cipher level
                ];

                const urlStatus = getUrlStatus(checks);
                const urlStatusColour = getUrlStatusColour(urlStatus);

                const result = {
                    text: ':dog: WOOF WOOF! Can I have a biscuit now?',
                    attachments: [
                        {
                            title: url.toUpperCase(),
                            title_link: `${url}`,
                            color: urlStatusColour,
                            fields: getSlackFields(checks)
                        }
                    ]
                };

                return result;

            }
            catch (error) {
                return Promise.reject(error);
            }
        }
        else { // Test watched urls
            return;
        }
    }
};

function checkStatusIsOK(fetchResult) {
    const checkResult = createCheckResult('Request Status Check');

    if (fetchResult.ok === true) {
        checkResult.slackField.value = `:white_check_mark: ${fetchResult.status} ${fetchResult.statusText}`;
        checkResult.status = CHECK_STATUS.GOOD;
    }
    else {
        checkResult.slackField.value = `:rotating_light: ${fetchResult.status} ${fetchResult.statusText}`;
        checkResult.status = CHECK_STATUS.DANGER;
    }

    return checkResult;
}

function getUrlStatus(checks) {
    return checks.reduce((result, check) => {
        if (check.status > result) {
            return check.status;
        }
        else {
            return result;
        }
    },0);
}

function getUrlStatusColour(status) {

    switch (status) {
        case CHECK_STATUS.GOOD:
            return COLOURS.GOOD;
        case CHECK_STATUS.WARNING:
            return COLOURS.WARNING;
        case CHECK_STATUS.DANGER:
            return COLOURS.DANGER;
        default:
            return COLOURS.WARNING;
    }
}

function getSlackFields(checks) {
    return checks.map((check) => {
        return check.slackField;
    });
}