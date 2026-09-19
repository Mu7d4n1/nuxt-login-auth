import { defineEventHandler } from 'h3'
import { getAuthSession } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const session = await getAuthSession(event)

  await session.clear()

  return {
    success: true
  }
})