// @desc    Get one single owner
// @route   GET /api/owners/:id
// @access  Private
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const { username } = await requireAuth(event)
  const user = await UserSchema.findOne({ username })

  if (!user) {
    throw createError({
      statusMessage: 'Você não tem autorização para acessar essa rota',
      statusCode: 403
    })
  }

  const owner = await OwnerSchema.findOne({ user: user._id, _id: id }).populate({
    path: 'vehicles',
    select: '_id brand model plate'
  })

  setResponseStatus(event, 200)
  return owner
})