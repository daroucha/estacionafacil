// @desc    Post owner
// @route   POST /api/owners
// @access  Private
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username } = await requireAuth(event)

  const user = await UserSchema.findOne({ username })

  if (user) {
    return await new OwnerSchema({
      ...body,
      user: user._id
    }).save()
  }
})