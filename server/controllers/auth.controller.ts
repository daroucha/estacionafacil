import type { H3Event } from 'h3'
import { setAuth, requireAuth, clearAuth } from "../utils/auth"
import bcrypt from 'bcryptjs'









const sendTokenResponse = async (event: H3Event, username: string) => {
  const token = await setAuth(event, username)

  return {
    success: true,
    username,
    token,
  }
}