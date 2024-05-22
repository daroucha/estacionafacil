// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export default defineEventHandler(async (event) => {
  const payload = await requireAuth(event)

  setResponseStatus(event, 200)

  return {
    ...payload,
  }
})