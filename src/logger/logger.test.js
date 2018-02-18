const winstonSpy = require('winston-spy');
const correlator = require('correlation-id');

const underTest = require('./logger');

const mockLog = jest.fn();

afterEach(() => {
  jest.resetAllMocks();
});

it('should have a console transport', () => {
  expect(underTest.logger.transports.console).toBeDefined();
});

describe('logger', () => {
  beforeAll(() => {
    underTest.logger.remove(underTest.logger.transports.console);
    underTest.logger.add(winstonSpy, { spy: mockLog });
  });

  it('should have the console transport disabled during tests', () => {
    expect(underTest.logger.transports.console).not.toBeDefined();
  });

  it('should add a an app meta property to every log message', () => {
    underTest.logger.info();
    expect(mockLog).toHaveBeenCalledWith('info', '', expect.objectContaining({ app: 'watchdog' }));
  });

  it('should add a timestamp to every log message', () => {
    const expectedTimestamp = 1234;
    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(expectedTimestamp);

    underTest.logger.info();

    expect(dateNowSpy).toHaveBeenCalled();
    expect(mockLog).toHaveBeenCalledWith('info', '', expect.objectContaining({ timestamp: expectedTimestamp }));
  });

  it('should add a correlation ID to every log message', () => {
    const expectedId = 'some-id';
    const correlatorGetIdSpy = jest.spyOn(correlator, 'getId');

    correlator.withId(expectedId, () => {
      underTest.logger.info();
    });

    expect(mockLog).toHaveBeenCalledWith('info', '', expect.objectContaining({ correlationId: expectedId }));
    expect(correlatorGetIdSpy).toHaveBeenCalled();
  });

  it('should add a caller to every log message', () => {
    underTest.logger.info();
    expect(mockLog).toHaveBeenCalledWith('info', '', expect.objectContaining({ caller: __filename }));
  });
});
