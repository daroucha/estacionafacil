import { getVehicles } from "~/server/controllers/vehicle.controller";
import { createRouter, useBase } from "h3";

const router = createRouter()

router.get('/', getVehicles)

export default useBase('/api/vehicle', router.handler)