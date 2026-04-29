import { Router } from "express";
import { registrUser } from  "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();
// /api/v1/healthcheck/test

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registrUser);
// router.route("/test").get(healthcheck);

export default router;