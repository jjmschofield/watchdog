const { createNextMock, createResponseMock, createRequestMock } = require('../../../test/mocks/express.mock');
const { createMockLogger } = require('../../logger/logger.mock');


const mockGetConfig = jest.fn();
const mockLogger = createMockLogger();


let mockNext;
let mockReq;
let mockRes;
let underTest;

beforeEach(() => {
  mockNext = createNextMock();
  mockReq = createRequestMock();
  mockRes = createResponseMock();

  jest.mock('../../config/config', () => {
    return {
      getConfig: mockGetConfig,
    };
  });

  jest.mock('../../logger/logger', () => {
    return mockLogger;
  });

  // eslint-disable-next-line global-require
  underTest = require('./authenticate');
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('slackAuthentication', () => {
  describe('when slack secret command token has been set', () => {

    const validSlackCommandToken = 'valid token';

    beforeEach(() => {
      mockGetConfig.mockImplementation(() => {
        return {
          slackCommandToken: validSlackCommandToken,
        };
      });
    });

    describe('and the request provides a valid token', () => {
      beforeEach(() => {
        mockReq.body.token = validSlackCommandToken;
      });

      it('should call next', () => {
        underTest.slackAuthentication(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalled();
      });
    });

    describe('and the request does not provide a valid token', () => {
      beforeEach(() => {
        mockReq.body.token = 'invalid-token';
      });
      it('should not call next', () => {
        underTest.slackAuthentication(mockReq, mockRes, mockNext);
        expect(mockNext).not.toBeCalled();
      });
      it('should set the response to 401 error', () => {
        underTest.slackAuthentication(mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.send).toHaveBeenCalled();
      });
    });
  });

  describe('when slack secret command token has not been set', () => {
    beforeEach(() => {
      mockGetConfig.mockImplementation(() => {
        return {
          slackCommandToken: null,
        };
      });
    });

    it('should set the response to 503 error', () => {
      underTest.slackAuthentication(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(503);
      expect(mockRes.send).toHaveBeenCalled();
    });

    it('should log the event', () => {
      underTest.slackAuthentication(mockReq, mockRes, mockNext);
      expect(mockLogger.logger.warn).toHaveBeenCalledWith(expect.stringContaining('SLACK_COMMAND_TOKEN'));
    });

    it('should not call next', () => {
      underTest.slackAuthentication(mockReq, mockRes, mockNext);
      expect(mockNext).not.toBeCalled();
    });
  });
});
