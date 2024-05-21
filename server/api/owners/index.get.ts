// @desc    Get all owners
// @route   GET /api/owners
// @access  Private
export default defineEventHandler(async (event) => {
  const { username } = await requireAuth(event)

  const user = await UserSchema.findOne({ username })

  try {
    if (user) {
      return await OwnerSchema.find({ user: user._id })
    }
  } catch (error) {
    return error
  }
})