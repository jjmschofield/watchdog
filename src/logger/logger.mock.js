module.exports = {
  createMockLogger: () => {
    return {
      logger: {
        warn: jest.fn(),
        info: jest.fn(),
      },
    };
  },
};
