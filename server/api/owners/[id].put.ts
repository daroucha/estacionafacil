// @desc    Update selected owner
// @route   GET /api/owners/:id
// @access  Private
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username } = await requireAuth(event)

  const user = await UserSchema.findOne({ username })

  try {
    if (user) {
      return await OwnerSchema.findOneAndUpdate({
        user: user._id,
        _id: event.context.params?.id
      }, body, { new: true })
    }
  } catch (error) {
    return error
  }
})