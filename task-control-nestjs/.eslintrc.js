module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'keyword-spacing': ['error', { before: true, after: true }],
    'brace-style': ['error', '1tbs'],
    'curly': ['error', 'all'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'import', next: 'expression' },
      { blankLine: 'always', prev: 'import', next: 'class' },
    ],
  },
};
