/// <reference types="./types.d.ts" />

import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginImport from 'eslint-plugin-import'
import turboConfig from 'eslint-config-turbo/flat'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'
import onlyWarn from 'eslint-plugin-only-warn'
import { globalIgnores } from 'eslint/config'

export const restrictEnvAccess = tseslint.config(
  globalIgnores(['**/env.ts', 'dist/**']),
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message:
            'Avoid using process.env directly - validate your types with valibot (example in ./apps/server/env.ts)'
        }
      ],
      'no-restricted-imports': [
        'error',
        {
          name: 'process',
          importNames: ['env'],
          message:
            'Avoid using process.env directly - validate your types with valibot (example in ./apps/server/env.ts)'
        }
      ]
    }
  }
)

export default tseslint.config([
  globalIgnores(['dist/**']),
  ...turboConfig,
  // Base rules
  js.configs.recommended,
  eslintConfigPrettier,

  // Type-aware TypeScript rules
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn'
    }
  },
  {
    plugins: {
      onlyWarn
    }
  },
  {
    plugins: {
      import: eslintPluginImport
    },
    rules: {
      'import/no-cycle': 'warn',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'type',
            'internal',
            'parent',
            'sibling',
            'index',
            'object'
          ],
          alphabetize: {
            order: 'asc'
          }
        }
      ]
    }
  },
  {
    rules: {
      semi: ['error', 'never'],
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  }
])
