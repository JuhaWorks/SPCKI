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

      // SQL injection prevention
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.name="query"] > TemplateLiteral',
          message: 'Avoid template literals in query calls — use parameterised queries for SQL.',
        },
        {
          selector: 'CallExpression[callee.property.name="query"] > TemplateLiteral',
          message: 'Avoid template literals in query calls — use parameterised queries for SQL.',
        },
      ],

      // General best practices
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
