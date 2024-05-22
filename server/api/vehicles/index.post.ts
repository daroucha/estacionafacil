// @desc    Post vehicle
// @route   POST /api/vehicles
// @access  Private
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username } = await requireAuth(event)
  const user = await UserSchema.findOne({ username })

  if (!user) {
    throw createError({
      message: 'Você não tem autorização para acessar essa rota',
      statusCode: 403
    })
  }

  const vehicle = await new VehicleSchema({
    ...body,
    user: user._id
  })

  const owner = await OwnerSchema.findById(body.owner)

  if (!owner) {
    throw createError({
      message: 'Esse proprietário não existe',
      statusCode: 404
    })
  }

  await owner.vehicles!.push(vehicle)
  await owner.save()

  setResponseStatus(event, 201)

  return await vehicle.save().then(model => model.populate({
    path: 'owner',
    select: 'name'
  })).then(model => model)
})