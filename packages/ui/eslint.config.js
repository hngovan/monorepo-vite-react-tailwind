import baseConfig from '@inu/eslint-config/base'
import reactConfig from '@inu/eslint-config/react'

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**']
  },
  ...baseConfig,
  ...reactConfig
]
