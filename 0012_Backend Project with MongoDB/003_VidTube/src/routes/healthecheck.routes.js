import { Router } from "express";
import { healthcheck } from "../controllers/healthecheck.controllers.js";

const router = Router();
// /api/v1/healthcheck/test

router.route("/").get(healthcheck);
// router.route("/test").get(healthcheck);

export default router;