import bcrypt from 'bcryptjs'
import { AuthPayload } from '~/types'

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export default defineEventHandler(async (event) => {
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

  const token = await setAuth(event, username)

  return {
    success: true,
    token: token.data.username,
  }
})