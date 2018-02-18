class Config {
  constructor() {
    this.slackCommandToken = process.env.SLACK_COMMAND_TOKEN;
    this.logLevel = process.env.LOG_LEVEL;
    Object.freeze(this);
  }
}

module.exports = {
  getConfig: () => {
    return new Config();
  },
};
