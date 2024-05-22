// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Private
export default defineEventHandler(async (event) => {
  const { username } = await requireAuth(event)
  const user = await UserSchema.findOne({ username })

  if (!user) {
    throw createError({
      message: 'Você não tem autorização para acessar essa rota',
      statusCode: 403
    })
  }

  const vehicles = await VehicleSchema.find({ user: user._id }).populate({
    path: 'owner',
    select: 'name'
  })

  setResponseStatus(event, 200)
  return vehicles
})