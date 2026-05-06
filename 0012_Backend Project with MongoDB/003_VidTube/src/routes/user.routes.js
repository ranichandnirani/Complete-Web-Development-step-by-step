import { Router } from "express";
import { registerUser, logoutUser } from  "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

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
    registerUser);
// router.route("/test").get(healthcheck);

// secured route
router.route("/logout").post(verifyJWT, logoutUser);

export default router;