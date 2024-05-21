// @desc    Log user out & clear cookie
// @route   GET /api/auth/logout
// @access  Private
export default defineEventHandler(async (event) => {
  await clearAuth(event)
  return {
    success: true
  }
})