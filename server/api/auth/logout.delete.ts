// @desc    Log user out & clear cookie
// @route   DELETE /api/auth/logout
// @access  Private
export default defineEventHandler(async (event) => {
  await clearAuth(event)

  setResponseStatus(event, 200)

  return {
    success: true
  }
})