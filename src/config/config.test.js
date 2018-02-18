let underTest;

describe('getConfig', () => {
  const expectedSlackCommandToken = 'some-tokent';

  beforeEach(() => {
    process.env.SLACK_COMMAND_TOKEN = expectedSlackCommandToken;
    // eslint-disable-next-line global-require
    underTest = require('./config');
  });

  afterEach(() => {
    delete process.env.SLACK_COMMAND_TOKEN;
  });

  it('should return an instance of Config', () => {
    const result = underTest.getConfig();
    expect(result.constructor.name).toEqual('Config');
  });

  it('should set the slackCommandToken from the environment variable', () => {
    const result = underTest.getConfig();
    expect(result.slackCommandToken).toEqual(expectedSlackCommandToken);
  });

  it('should freeze the returned Config', () => {
    const result = underTest.getConfig();
    expect(Object.isFrozen(result)).toEqual(true);
  });
});
