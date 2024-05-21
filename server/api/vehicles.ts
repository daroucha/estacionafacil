import { getVehicles } from "~/server/controllers/vehicles.controller";
import { createRouter, useBase } from "h3";

const router = createRouter()

router.get('/', getVehicles)

export default useBase('/api/vehicles', router.handler)