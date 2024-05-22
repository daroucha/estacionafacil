// @desc    Update selected vehicle
// @route   GET /api/vehicles/:id
// @access  Private
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username } = await requireAuth(event)

  const user = await UserSchema.findOne({ username })

  try {
    if (user) {
      return await VehicleSchema.findOneAndUpdate({
        user: user._id,
        _id: event.context.params?.id
      }, body, { new: true }).populate({
        path: 'owner',
        select: 'name'
      })
    }
  } catch (error) {
    return error
  }
})