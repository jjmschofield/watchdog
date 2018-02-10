class Config {
    constructor(){
        this.slackCommandToken = process.env.SLACK_COMMAND_TOKEN;
        Object.freeze(this);
    }
}

module.exports = {
  getConfig: () => new Config()
};