const fetch = require('isomorphic-fetch');

const {CHECK_STATUS} = require('../definitions/CHECK_STATUS');
const {COLOURS} = require('../definitions/COLOURS');


module.exports = {
    doCheck: async (commandArgs) => {
        const domain = commandArgs[0];

        if (typeof domain === 'string') { //Test the provided domain
            try {
                const fetchResult = await fetchDomain(domain);

                const checks = [
                    checkStatusIsOK(fetchResult)
                ];

                const domainStatus = getDomainStatus(checks);
                const domainStatusColour = getDomainStatusColour(domainStatus);

                const result = {
                    text: ':dog: WOOF WOOF! Can I have a biscuit now?',
                    attachments: [
                        {
                            title: domain,
                            title_link: `https://${domain}`,
                            color: domainStatusColour,
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
        else { // Test watched domains
            return;
        }
    }
};

function fetchDomain(domain) {
    return fetch('https://' + domain);
}

function checkStatusIsOK(fetchResult) {
    const result = {
        slackField: {
            title: 'HTTPS Status Check',
            short: true
        }
    };

    if (fetchResult.ok === true) {
        result.slackField.value = `:white_check_mark: ${fetchResult.status} ${fetchResult.statusText}`;
        result.status = CHECK_STATUS.GOOD;
    }
    else {
        result.slackField.value = `:rotating_light: ${fetchResult.status} ${fetchResult.statusText}`;
        result.status = CHECK_STATUS.DANGER;
    }

    return result;
}

function getDomainStatus(checks) {
    return checks.reduce((result, check) => {
        if (check.status > result) {
            return check.status;
        }
        else {
            return result;
        }
    },0);
}

function getDomainStatusColour(status) {

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