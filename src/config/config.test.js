let underTest;

describe('getConfig', () => {
  const expectedSlackCommandToken = 'some-tokent';
  const expectedLogLevel = 'silly';

  beforeEach(() => {
    process.env.SLACK_COMMAND_TOKEN = expectedSlackCommandToken;
    process.env.LOG_LEVEL = expectedLogLevel;
    // eslint-disable-next-line global-require
    underTest = require('./config');
  });

  afterEach(() => {
    delete process.env.SLACK_COMMAND_TOKEN;
    delete process.env.LOG_LEVEL;
  });

  it('should return an instance of Config', () => {
    const result = underTest.getConfig();
    expect(result.constructor.name).toEqual('Config');
  });

  it('should set the slackCommandToken from the environment variable', () => {
    const result = underTest.getConfig();
    expect(result.slackCommandToken).toEqual(expectedSlackCommandToken);
  });

  it('should set the logLevel from the environment variable', () => {
    const result = underTest.getConfig();
    expect(result.logLevel).toEqual(expectedLogLevel);
  });

  it('should freeze the returned Config', () => {
    const result = underTest.getConfig();
    expect(Object.isFrozen(result)).toEqual(true);
  });
});
