// @desc    Delete one vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private
export default defineEventHandler(async (event) => {
  const { username } = await requireAuth(event)
  const user = await UserSchema.findOne({ username })

  if (!user) {
    throw createError({
      statusMessage: 'Você não tem autorização para acessar essa rota',
      statusCode: 403
    })
  }

  await VehicleSchema.findByIdAndDelete(event.context.params?.id)

  setResponseStatus(event, 200)

  return {
    success: true
  }
})