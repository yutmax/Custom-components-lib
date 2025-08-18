const js = require('@eslint/js');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const prettierPlugin = require('eslint-plugin-prettier');
const jestPlugin = require('eslint-plugin-jest');

module.exports = [
  js.configs.recommended,

  {
    ignores: ['**/.storybook/**'],
  },

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...jestPlugin.environments.globals.globals,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
      jest: jestPlugin,
    },
    rules: {
      ...tsPlugin.configs['recommended'].rules,
      ...reactPlugin.configs['recommended'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'error',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
    settings: {
      react: {
        version: '19.1.1',
      },
    },
  },

  {
    files: ['**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      },
    },
  },
];
