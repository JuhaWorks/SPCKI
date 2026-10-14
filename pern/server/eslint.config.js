import security from 'eslint-plugin-security';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['node_modules/**', 'coverage/**'],
  },
  {
    files: ['src/**/*.js', 'tests/**/*.js'],
    plugins: {
      security,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      // Security
      ...security.configs.recommended.rules,

      // General best practices
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
