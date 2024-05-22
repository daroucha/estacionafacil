// @desc    Post owner
// @route   POST /api/owners
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

  const owner = await new OwnerSchema({
    ...body,
    user: user._id
  }).save()

  setResponseStatus(event, 201)
  return owner
})