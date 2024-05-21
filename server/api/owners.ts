import { getOwners, postOwner } from "../controllers/owners.controller";
import { createRouter, useBase } from "h3";

const router = createRouter()

router.get('/', getOwners)
router.post('/', postOwner)

export default useBase('/api/owners', router.handler)