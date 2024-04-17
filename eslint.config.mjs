import { ESLint } from 'eslint';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import securityPlugin from 'eslint-plugin-security';

export default {
  plugins: {
    '@typescript-eslint': typescriptPlugin,
    'security': securityPlugin,
  },
  languageOptions: {
    parser: typescriptParser,
  },
  rules: {
    // Règles ESLint spécifiques
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-console': 'error',
    'camelcase': 'error',
    'comma-spacing': 'error',
    'no-trailing-spaces': 'error',
    'arrow-spacing': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-eval': 'error',
    'no-inline-comments': 'error',
    'block-scoped-var': 'error',
    'guard-for-in': 'error',
    'no-implicit-globals': 'error',
    'no-alert': 'error',
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'security/detect-non-literal-regexp': 'error',
  },
  files: ['**/*.ts'],
};
