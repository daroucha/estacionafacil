// @desc    Post vehicle
// @route   POST /api/vehicles
// @access  Private
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username } = await requireAuth(event)

  const user = await UserSchema.findOne({ username })

  if (user) {
    return await new VehicleSchema({
      ...body,
      user: user._id
    }).save()
  }
})