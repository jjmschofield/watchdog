const { createMockLogger } = require('../logger/logger.mock');

const mockLogger = createMockLogger();
const mockDotEnvConfig = jest.fn();

let underTest;

beforeEach(() => {
  jest.mock('../logger/logger', () => {
    return mockLogger;
  });

  mockDotEnvConfig.mockImplementation(() => {
    return {
      parsed: {},
    };
  });

  jest.mock('dotenv', () => {
    return {
      config: mockDotEnvConfig,
    };
  });

  // eslint-disable-next-line global-require
  underTest = require('./envLoader');
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('loadEnvironmentVariables', () => {
  describe('when the environment config can be retrieved from .env', () => {
    beforeEach(() => {
      mockDotEnvConfig.mockImplementation(() => {
        return {
          parsed: {
            SOME_KEY: 'some value',
          },
        };
      });
    });

    it('should log the environment variables set from config', () => {
      underTest.loadEnvironmentVariables();
      expect(mockLogger.logger.info).toHaveBeenCalledWith('Loaded environment variables from .env', { envVars: ['SOME_KEY'] });
    });
  });

  describe('when the environment config can\'t be retrieved from .env', () => {
    const expectedMessage = 'some message';

    beforeEach(() => {
      mockDotEnvConfig.mockImplementation(() => {
        return {
          error: {
            message: expectedMessage,
          },
          parsed: {},
        };
      });
    });

    it('should log a warning', () => {
      underTest.loadEnvironmentVariables();
      expect(mockLogger.logger.warn).toHaveBeenCalledWith(expectedMessage);
    });
  });
});

