import type { AuthPayload } from '~/types'
import type { H3Event } from 'h3'

const { JWT_SECRET } = process.env
const SECRET = JWT_SECRET || ''

export async function _useSession(event: H3Event, username?: string) {
  const session = await useSession(event, {
    password: SECRET,
    name: 'authorization',
  })
  if (username)
    await session.update({ username })
  return {
    ...session,
    data: session.data as AuthPayload
  }
}