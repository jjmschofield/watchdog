let underTest;

beforeEach(() => {
// eslint-disable-next-line global-require
  underTest = require('./validators');
});

describe('isAllowedUrl', () => {
  describe('when given a valid URL', () => {
    describe('and the url contains https', () => {
      const validUrl = 'https://valid.url';

      it('should return true', () => {
        const result = underTest.isAllowedUrl(validUrl);
        expect(result).toEqual(true);
      });
    });
    describe('and the url contains http', () => {
      const validUrl = 'http://valid.url';

      it('should return true', () => {
        const result = underTest.isAllowedUrl(validUrl);
        expect(result).toEqual(true);
      });
    });
    describe('and the url contains neither https nor http', () => {
      const validUrl = 'valid.url';

      it('should return true', () => {
        const result = underTest.isAllowedUrl(validUrl);
        expect(result).toEqual(true);
      });
    });
  });

  describe('when given a non-string', () => {
    const nonString = 123;

    it('should return false', () => {
      const result = underTest.isAllowedUrl(nonString);
      expect(result).toEqual(false);
    });
  });


  describe('when given a string which is not a valid URL pattern', () => {
    const notValidUrl = 'notvalidurl';

    it('should return false', () => {
      const result = underTest.isAllowedUrl(notValidUrl);
      expect(result).toEqual(false);
    });
  });

  describe('when given a URL that does not contain an FQDN', () => {
    const notValidUrl = 'https://123.1.1.1';

    it('should return false', () => {
      const result = underTest.isAllowedUrl(notValidUrl);
      expect(result).toEqual(false);
    });
  });

  describe('when given a URL that tries to target localhost', () => {
    const notValidUrl = 'https://localhost';

    it('should return false', () => {
      const result = underTest.isAllowedUrl(notValidUrl);
      expect(result).toEqual(false);
    });
  });

  describe('when given a URL that tries to target 127.0.0.1', () => {
    const notValidUrl = 'https://127.0.0.1';

    it('should return false', () => {
      const result = underTest.isAllowedUrl(notValidUrl);
      expect(result).toEqual(false);
    });
  });
});
