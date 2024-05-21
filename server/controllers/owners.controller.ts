import { OwnerSchema } from "../models/Owner"

// @desc    Get all owners
// @route   GET /api/owners
// @access  Public
export const getOwners = defineEventHandler(async (event) => {
  try {
    const data = await OwnerSchema.find()

    return {
      success: true,
      data
    }
  } catch (error) {
    return error
  }
})

// @desc    Post owner
// @route   POST /api/owners
// @access  Public
export const postOwner = defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await new OwnerSchema({ ...body }).save()
})