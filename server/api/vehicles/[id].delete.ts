// @desc    Delete one vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private
export default defineEventHandler(async (event) => {
  const { username } = await requireAuth(event)

  const user = await UserSchema.findOne({ username })

  try {
    if (user) {
      await VehicleSchema.findByIdAndDelete(event.context.params?.id)

      return {
        success: true
      }
    }
  } catch (error) {
    return error
  }
})