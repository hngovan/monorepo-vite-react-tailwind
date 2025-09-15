/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly PUBLIC_WEB_URL: string
  readonly PUBLIC_SERVER_URL: string
  readonly PUBLIC_SERVER_API_PATH: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
