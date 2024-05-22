import type { ObjectId } from 'mongoose'

interface Query {
  user: ObjectId
  name?: Object
}

// @desc    Get all owners
// @route   GET /api/owners
// @access  Private
export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const { username } = await requireAuth(event)

  const user = await UserSchema.findOne({ username })

  try {
    if (user) {
      let reqQuery: Query = { user: user._id }

      if (query.name && query.name !== '') {
        reqQuery = {
          ...reqQuery,
          name: {
            $regex: `.*${query.name}.*`
          }
        }
      }

      return await OwnerSchema.find(reqQuery).select('-vehicles')
    }
  } catch (error) {
    return error
  }
})