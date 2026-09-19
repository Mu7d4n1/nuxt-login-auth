import {
  createError,
  defineEventHandler,
  getRequestURL
} from 'h3'

import { getAuthSession } from '../utils/session'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  const session = await getAuthSession(event)

  const user = session.data.user

  console.log('==============================')
  console.log('SERVER MIDDLEWARE')
  console.log('PATH:', url.pathname)
  console.log('SESSION USER:', user)
  console.log('==============================')

  if (url.pathname === '/home') {
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }
  }

  if (
    url.pathname === '/admin' ||
    url.pathname.startsWith('/admin/')
  ) {
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    if (user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Admin access required'
      })
    }
  }
})