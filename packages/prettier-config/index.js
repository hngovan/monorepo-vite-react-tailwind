/** @typedef {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig } */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: false,
  trailingComma: 'none',
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  quoteProps: 'as-needed'
}

export default config
