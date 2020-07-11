module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  ignorePatterns: [
    'build/**',
  ],
  rules: {
    'arrow-parens': [
      'error',
      'always',
    ],
    'max-len': 0,
    'import/first': 0,
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
};
