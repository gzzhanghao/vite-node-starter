import eslint from '@eslint/js';
import eslintImport from 'eslint-plugin-import';
import oxlint from 'eslint-plugin-oxlint';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  oxlint.configs['flat/recommended'],
  {
    ignores: ['**/dist/'],
  },
  {
    plugins: {
      import: eslintImport,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
    },
  },
);
