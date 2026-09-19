import { z } from 'zod'
import {
  createError,
  defineEventHandler,
  readBody
} from 'h3'

import { login } from '../../services/auth'

const loginSchema = z.object({
  username: z
    .string({
      error: 'Username is required'
    })
    .min(4, {
      message: 'Invalid username'
    }),

  password: z
    .string({
      error: 'Password is required'
    })
    .min(4, {
      message: 'Password must be at least 4 characters'
    })
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = loginSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: result.error.issues
    })
  }

  const user = await login(event, result.data)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid username or password'
    })
  }

  return {
    success: true,
    user
  }
})