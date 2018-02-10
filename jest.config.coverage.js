const path = require('path');
const baseConfig = require('./jest.config');

module.exports = {
    ...baseConfig,
    collectCoverage: true,
    coverageDirectory: path.resolve(__dirname, './test/coverage'),
    coverageReporters: ['text', 'json', 'html', 'lcov'],
    coverageThreshold: {
        'global': {
            'branches': 80,
            'functions': 80,
            'lines': 80,
            'statements': 80
        }
    },
    collectCoverageFrom: [
        'src/**/*.js',
        '!**/*.test.js',
        '!**/*.mock.js',
        '!jest.config.js',
        '!jest.coverage.config.js',
    ]
}
