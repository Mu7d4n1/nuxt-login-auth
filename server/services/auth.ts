import type { H3Event } from 'h3'
import { getUser } from '../repositories/user'
import { getAuthSession } from '../utils/session'

interface LoginInput {
  username: string
  password: string
}

export async function login(
  event: H3Event,
  input: LoginInput
) {
  console.log('AUTH INPUT:', input)

  const user = await getUser(
    input.username,
    input.password
  )

  console.log('AUTH USER:', user)

  if (!user) {
    return null
  }

  const session = await getAuthSession(event)

  console.log('SESSION BEFORE UPDATE:', session.data)

  await session.update({
    user: {
      username: user.username,
      name: user.name,
      role: user.role
    }
  })

  console.log('SESSION AFTER UPDATE:', session.data)

  return session.data.user
}