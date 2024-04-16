import { ESLint } from 'eslint';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default {
  plugins: {
    '@typescript-eslint': typescriptPlugin,
  },
  languageOptions: {
    parser: typescriptParser,
  },
  rules: {
    // Basic rules
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 'error',

    // Stylistic rules
    camelcase: 'error',
    'comma-spacing': 'error',
    'no-trailing-spaces': 'error',
    'space-before-function-paren': ['error', 'always'],

    // ECMAScript 6 rules
    'arrow-spacing': 'error',
    'no-var': 'error',
    'prefer-const': 'error',

    // TypeScript-specific rules
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  files: ['**/*.ts'],
};
