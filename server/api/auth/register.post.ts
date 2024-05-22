// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  const user = await UserSchema.create({
    username,
    password
  })

  const token = await setAuth(event, user.username)

  setResponseStatus(event, 200)

  return {
    success: true,
    token: token.data.username,
  }
})