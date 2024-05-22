// @desc    Update selected vehicle
// @route   PUT /api/vehicles/:id
// @access  Private
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username } = await requireAuth(event)
  const user = await UserSchema.findOne({ username })

  if (!user) {
    throw createError({
      statusMessage: 'Você não tem autorização para acessar essa rota',
      statusCode: 403
    })
  }

  const vehicle = await VehicleSchema.findOneAndUpdate({
    user: user._id,
    _id: event.context.params?.id
  }, body, { new: true }).populate({
    path: 'owner',
    select: 'name'
  })

  setResponseStatus(event, 200)
  return vehicle
})