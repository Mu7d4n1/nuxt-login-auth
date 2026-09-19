import { defineEventHandler } from 'h3'
import { getAuthSession } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const session = await getAuthSession(event)

  const user = session.data.user ?? null

  return {
    authenticated: Boolean(user),
    user
  }
})