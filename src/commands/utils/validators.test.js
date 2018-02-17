describe('src/commands/utils/validators', () => {
  describe('isAllowedUrl', () => {
    describe('when given a valid URL', () => {
      it('should return true', () => {
        expect(false).toEqual(true);
      });
    });

    describe('when given a non-string', () => {
      it('should return false', () => {
        expect(false).toEqual(true);
      });
    });


    describe('when given a string which is not a valid URL pattern', () => {
      it('should return false', () => {
        expect(false).toEqual(true);
      });
    });

    describe('when given a URL that does not contain an FQDN', () => {
      it('should return false', () => {
        expect(false).toEqual(true);
      });
    });

    describe('when given a URL that tries to target localhost', () => {
      it('should return false', () => {
        expect(false).toEqual(true);
      });
    });

    describe('when given a URL that tries to target 127.0.0.1', () => {
      it('should return false', () => {
        expect(false).toEqual(true);
      });
    });
  });
});
