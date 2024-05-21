import type { AuthPayload } from '~/types'
import { SignJWT, jwtVerify } from 'jose'

const { JWT_SECRET, JWT_EXPIRE } = process.env

const SECRET = new TextEncoder().encode(JWT_SECRET)
const EXPIRE = JWT_EXPIRE || '2h'

export async function createJWT(username: string) {
  return await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRE)
    .sign(SECRET)
}

export async function verifyJWT(token: string) {
  return (await jwtVerify(token, SECRET)).payload as AuthPayload
}