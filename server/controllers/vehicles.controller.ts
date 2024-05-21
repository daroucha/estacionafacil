import { VehicleSchema } from "../models/Vehicle"

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public
export const getVehicles = defineEventHandler(async (event) => {
  try {
    const data = await VehicleSchema.find()

    return {
      success: true,
      data
    }
  } catch (error) {
    return error
  }
})