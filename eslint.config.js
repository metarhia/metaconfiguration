'use strict';

const init = require('eslint-config-metarhia');

module.exports = [
  ...init,
  {
    files: ['examples/**/*.js'],
    rules: {
      strict: 'off',
    },
    languageOptions: {
      globals: {
        duration: true,
      },
    },
  },
];
