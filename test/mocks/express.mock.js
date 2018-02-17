module.exports = {
  createNextMock: () => {
    return jest.fn();
  },
  createRequestMock: () => {
    return {
      body: {},
    };
  },
  createResponseMock: () => {
    const responseMock = {
      status: jest.fn().mockImplementation(() => {
        return responseMock;
      }),
      send: jest.fn().mockImplementation(() => {
        return responseMock;
      }),
    };
    return responseMock;
  },
};
