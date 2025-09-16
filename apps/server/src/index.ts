import { createAuth } from '@inu/auth/server'
import { createDb } from '@inu/db/client'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { createApi } from './../../../packages/api/src/server/index'
import { env } from './env'
import { generateRootHtml } from './utils'

// ========================================================================= //

const trustedOrigins = [env.PUBLIC_WEB_URL].map(url => new URL(url).origin)

const db = createDb({ databaseUrl: env.SERVER_POSTGRES_URL })

const auth = createAuth({
  webUrl: env.PUBLIC_WEB_URL,
  serverUrl: env.PUBLIC_SERVER_URL,
  apiPath: env.PUBLIC_SERVER_API_PATH,
  authSecret: env.SERVER_AUTH_SECRET,
  db
})

const api = createApi({
  auth,
  db,
  serverUrl: env.PUBLIC_SERVER_URL,
  apiPath: env.PUBLIC_SERVER_API_PATH
})

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}>()

// ========================================================================= //

app.get('/healthcheck', c => {
  return c.text('OK')
})

app.use(logger())

app.get('/', c => {
  return c.html(generateRootHtml(env.PUBLIC_WEB_URL, env.PUBLIC_SERVER_URL))
})

// ========================================================================= //

app.use(
  `${env.PUBLIC_SERVER_API_PATH}/auth/*`,
  cors({
    origin: trustedOrigins,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600
  })
)

// ========================================================================= //

app.use(
  `${env.PUBLIC_SERVER_API_PATH}/*`,
  cors({
    origin: trustedOrigins,
    credentials: true
  }),
  async (c, next) => {
    const { matched, response } = await api.handler(c.req.raw)
    if (matched) {
      return c.newResponse(response.body, response)
    }

    await next()
  }
)

// ========================================================================= //

export default app
