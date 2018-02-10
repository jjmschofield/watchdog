class CheckResult {
    constructor(title) {
        this.slackField = {
            title: title,
            short: true
        };

        this.status = null;

        Object.seal(this);
    }
}

module.exports = {
    createCheckResult: (title) => {
        return new CheckResult(title);
    }
};
