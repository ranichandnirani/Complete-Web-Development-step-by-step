import {Router} from "express";
import {healthCheck} from "../controllers/healthcheck.controllers.js";
import { registerUser } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/register").post(registerUser);

export default router;
