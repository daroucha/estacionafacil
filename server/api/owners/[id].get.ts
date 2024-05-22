// @desc    Get one single owner
// @route   GET /api/owners/:id
// @access  Private
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const { username } = await requireAuth(event)

  const user = await UserSchema.findOne({ username })

  try {
    if (user) {
      return await OwnerSchema.findOne({ user: user._id, _id: id }).populate({
        path: 'vehicles',
        select: 'brand'
      })
    }
  } catch (error) {
    return error
  }
})