var commonDxTeamPrettierConfig = require('@fingerprintjs/prettier-config-dx-team')

/** @type {import('prettier').Options} */
module.exports = {
  ...commonDxTeamPrettierConfig,
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 80,
        singleQuote: true,
      },
    },
  ],
}
