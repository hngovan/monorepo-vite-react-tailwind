import { restrictEnvAccess } from '@inu/eslint-config/base'
import reactConfig from '@inu/eslint-config/react'

export default [
  ...reactConfig,
  ...restrictEnvAccess,
  {
    files: ['vite.config.ts'],
    rules: {
      'no-restricted-properties': 'off'
    }
  }
]
