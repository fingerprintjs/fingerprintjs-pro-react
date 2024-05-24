/**
 * Note: This config format is [deprecated](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
 * So running eslint might require setting the env variable ESLINT_USE_FLAT_CONFIG=false (especially inside GitHub actions etc.)
 */

module.exports = {
  ignorePatterns: ['dist/', 'build/'],
  extends: [
    'next/core-web-vitals',
    '@fingerprintjs/eslint-config-dx-team',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/display-name': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    '@next/next/no-html-link-for-pages': 'off',
  },
}
