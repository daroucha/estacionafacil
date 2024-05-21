// @desc    Get all vehicles
// @route   GET /api/vehicle
// @access  Public
export const getVehicles = defineEventHandler((event) => {
  // handle GET requests for the `api/foo` endpoint
  return {
    success: true,
    data: 'hello world!'
  }
})