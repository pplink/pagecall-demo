module.exports = {
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  parser: '@typescript-eslint/parser',
  rules: {
    indent: ['error', 2],
    'import/extensions': 0,
    'max-len': [
      2,
      {
        code: 150,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": 0,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
