const nx = require('@nx/eslint-plugin');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      'import/order': [
        'error',
        {
          'groups': [
            'builtin', // Módulos nativos de Node (fs, path, etc)
            'external', // Dependencias externas (npm, entre ellas @angular y rxjs)
            'internal', // Code interno del proyecto, por ejemplo @my-project/...
            ["sibling", "parent"],
            'index'     // Import al archivo index del directorio actual
          ],
          'pathGroups': [
            {
              // Primer bloque: Angular
              'pattern': '@angular/**',
              'group': 'external',
              'position': 'before'
            },
            {
              // Tercer bloque: imports internos del proyecto
              'pattern': '@olp/**',
              'group': 'internal',
              'position': 'after'
            }
          ],
          'pathGroupsExcludedImportTypes': ['builtin'],
          'newlines-between': 'always',
          "distinctGroup": true,
          'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true
          }
        }
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
        },
      ],
    },
    languageOptions: {
      parser: require('jsonc-eslint-parser'),
    },
  },
];
