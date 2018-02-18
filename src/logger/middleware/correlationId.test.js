const correlator = require('correlation-id');
const validator = require('validator');

const { createNextMock, createRequestMock, createResponseMock } = require('../../../test/mocks/express.mock');

let underTest;
let mockNext;
let mockReq;
let mockRes;

beforeEach(() => {
  mockNext = createNextMock();
  mockReq = createRequestMock();
  mockRes = createResponseMock();
  // eslint-disable-next-line global-require
  underTest = require('./correlationId');
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('setCorrelationId', () => {
  describe('when a request contains a correlation ID', () => {
    describe('and when that correlation ID is sent from a slack command', () => {
      const expectedId = 'some-id';

      beforeEach(() => {
        mockReq.body.trigger_id = expectedId;
      });

      it('should call next', () => {
        underTest.setCorrelationId(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });

      it('should set the correlation ID as the trigger_id', (done) => {
        mockNext.mockImplementation(() => {
          const result = correlator.getId();
          expect(result).toEqual(expectedId);
          done();
        });

        underTest.setCorrelationId(mockReq, mockRes, mockNext);
      });
    });
  });

  describe('or when the request does not contain a correlation ID', () => {
    it('should call next', () => {
      underTest.setCorrelationId(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should set a random correlation ID', (done) => {
      mockNext.mockImplementation(() => {
        const result = correlator.getId();
        const isValidGuid = validator.isUUID(result);

        expect(result).toBeDefined();
        expect(isValidGuid).toEqual(true);

        done();
      });

      underTest.setCorrelationId(mockReq, mockRes, mockNext);
    });
  });
});
