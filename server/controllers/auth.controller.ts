import type { H3Event } from 'h3'
import { setAuth, requireAuth, clearAuth } from "../utils/auth"
import bcrypt from 'bcrypt'

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  const user = await UserSchema.create({
    username,
    password
  })

  sendTokenResponse(event, username)
})

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = defineEventHandler(async (event) => {
  const payload = await requireAuth(event)

  return {
    ...payload,
  }
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  // Validate email and password
  if (!username || !password) {
    throw createError({
      statusMessage: 'Please provide an username and password',
      statusCode: 400
    })
  }

  // Check for user
  const user = await UserSchema.findOne({ username }).select('+password')

  if (!user) {
    throw createError({
      statusMessage: 'Invalid credentials',
      statusCode: 401
    })
  }

  // Check if password matches
  const isMatch = bcrypt.compareSync(password, user.password)

  if (!isMatch) {
    throw createError({
      statusMessage: 'Invalid credentials',
      statusCode: 401
    })
  }

  sendTokenResponse(event, username)
})

// @desc    Log user out & clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = defineEventHandler(async (event) => {
  await clearAuth(event)
  return {
    success: true
  }
})

const sendTokenResponse = async (event: H3Event, username: string) => {
  const token = await setAuth(event, username)

  return {
    success: true,
    username,
    token,
  }
}