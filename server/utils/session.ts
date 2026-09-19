import type { H3Event } from 'h3'
import { useSession } from 'h3'

export interface SessionUser {
  username: string
  name: string
  role: 'admin' | 'employee'
}

export interface AuthSession {
  user?: SessionUser
}

export async function getAuthSession(
  event: H3Event
) {
  const config = useRuntimeConfig()

  if (!config.sessionPassword) {
    throw new Error(
      'NUXT_SESSION_PASSWORD is not configured'
    )
  }

  return useSession<AuthSession>(event, {
    name: 'auth-session',

    password: config.sessionPassword,

    cookie: {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      path: '/'
    },

    maxAge: 60 * 60 * 8
  })
}