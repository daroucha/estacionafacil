// @desc    Post vehicle
// @route   POST /api/vehicles
// @access  Private
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username } = await requireAuth(event)

  const user = await UserSchema.findOne({ username })

  if (user) {
    const vehicle = await new VehicleSchema({
      ...body,
      user: user._id
    })

    return vehicle.save().then(model => model.populate({
      path: 'owner',
      select: 'name'
    })).then(model => model)
  }
})