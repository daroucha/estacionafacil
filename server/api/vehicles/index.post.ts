// @desc    Post vehicle
// @route   POST /api/vehicles
// @access  Private
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username } = await requireAuth(event)

  const user = await UserSchema.findOne({ username })

  if (user) {
    const owner = await OwnerSchema.findById(body.owner)

    const vehicle = await new VehicleSchema({
      ...body,
      user: user._id
    })

    await owner?.vehicles?.push(vehicle)
    await owner?.save()

    return await vehicle.save().then(model => model.populate({
      path: 'owner',
      select: 'name'
    })).then(model => model)
  }
})