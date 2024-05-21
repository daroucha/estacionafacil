// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Private
export default defineEventHandler(async (event) => {
  const { username } = await requireAuth(event)

  const user = await UserSchema.findOne({ username })

  try {
    if (user) {
      return await VehicleSchema.find({ user: user._id }).populate({
        path: 'owner',
        select: 'name'
      })
    }
  } catch (error) {
    return error
  }
})