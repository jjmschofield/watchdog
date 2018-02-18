const server = require('./server');
const envLoader = require('./config/envLoader');
const { createMockLogger } = require('./logger/logger.mock');

const mockLogger = createMockLogger();

let serverInitSpy;
let envLoadSpy;

beforeEach(() => {
  jest.mock('./logger/logger', () => {
    return mockLogger;
  });

  serverInitSpy = jest.spyOn(server, 'init');
  envLoadSpy = jest.spyOn(envLoader, 'loadEnvironmentVariables');
});

afterEach(() => {
  jest.resetAllMocks();
});

it('should initialize the server', () => {
  // eslint-disable-next-line global-require
  require('./index');
  expect(serverInitSpy).toHaveBeenCalled();
  expect(mockLogger.logger.info).toHaveBeenCalledWith(expect.stringContaining('Starting'));
  expect(envLoadSpy).toHaveBeenCalled();
});

