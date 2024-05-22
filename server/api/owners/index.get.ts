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

  if (!user) {
    throw createError({
      statusMessage: 'Você não tem autorização para acessar essa rota',
      statusCode: 403
    })
  }

  let reqQuery: Query = { user: user._id }

  if (query.name && query.name !== '') {
    reqQuery = {
      ...reqQuery,
      name: {
        $regex: `.*${query.name}.*`
      }
    }
  }

  const owners = await OwnerSchema.find(reqQuery).select('-vehicles')

  setResponseStatus(event, 200)
  return owners
})