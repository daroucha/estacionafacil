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
      statusMessage: 'Digite seu usuário e senha',
      statusCode: 400
    })
  }

  // Check for user
  const user = await UserSchema.findOne({ username }).select('+password')

  if (!user) {
    throw createError({
      statusMessage: 'Dados inválidos',
      statusCode: 401
    })
  }

  // Check if password matches
  const isMatch = bcrypt.compareSync(password, user.password)

  if (!isMatch) {
    throw createError({
      statusMessage: 'Dados inválidos',
      statusCode: 401
    })
  }

  const token = await setAuth(event, username)

  setResponseStatus(event, 200)

  return {
    success: true,
    token: token.data.username,
  }
})