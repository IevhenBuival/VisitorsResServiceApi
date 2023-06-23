import { Router } from "express";

import visits from "./visits.route";

const router = Router();

router.use("/visits", visits);

export default router;
