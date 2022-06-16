module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['preact', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['build/'],
  rules: {
    semi: ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'prefer-const': 'error',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
    curly: [2, 'all'],
  },
}
