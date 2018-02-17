module.exports = {
  createMockLogger: () => {
    return {
      logger: {
        warn: jest.fn(),
      },
    };
  },
};
