describe('logRequestStandard', () => {
  describe('when the request status code is less then 500', () => {
    it('should log the request at info level', () => {
      expect(true).toEqual(false);
    });
  });

  describe('when the request status code is greater then or equal to 500', () => {
    it('should not log', () => {
      expect(true).toEqual(false);
    });
  });

  describe('when running in production', () => {
    it('should log using the combined format', () => {
      expect(true).toEqual(false);
    });
  });

  describe('or when not running in production', () => {
    it('should log using the dev format', () => {
      expect(true).toEqual(false);
    });
  });
});

describe('logRequestError', () => {
  describe('when the request status code is less then 500', () => {
    it('should not log', () => {
      expect(true).toEqual(false);
    });
  });

  describe('when the request status code is greater then or equal to 500', () => {
    it('should log the request at error level', () => {
      expect(true).toEqual(false);
    });
  });

  describe('when running in production', () => {
    it('should log using the combined format', () => {
      expect(true).toEqual(false);
    });
  });

  describe('or when not running in production', () => {
    it('should log using the dev format', () => {
      expect(true).toEqual(false);
    });
  });
});
