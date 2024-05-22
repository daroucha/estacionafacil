// @desc    Update selected owner
// @route   PUT /api/owners/:id
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

  const owner = await OwnerSchema.findOneAndUpdate({
    user: user._id,
    _id: event.context.params?.id
  }, body, { new: true })

  setResponseStatus(event, 200)
  return owner
})