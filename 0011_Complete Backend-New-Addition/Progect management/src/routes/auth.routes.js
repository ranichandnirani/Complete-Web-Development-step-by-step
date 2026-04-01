import { Router } from "express";
import { changeCurrentPassword, forgotPasswordRequest, getCurrentUser, login, logoutUser, refreshAccessToken, registerUser, resendEmailVerification, resetForgotPassword, verifyEmail  }  from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";  
import { userRegisterValidator, userLoginValidator, userChangedCurrentPasswordValidator,
userForgotPasswordValidator,
userResetForgotPasswordValidator
} from "../validators/index.js"; 
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Unsecures route
router.route("/register").post(userRegisterValidator(), validate, registerUser);

router.route("/login").post(userLoginValidator(), validate, login);

router.route("/verify-email/:verificationToken").get(verifyEmail);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/forgot-password").post(userForgotPasswordValidator(), validate,forgotPasswordRequest);

router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(), validate, resetForgotPassword);


// secure code
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/current-user").post(verifyJWT, getCurrentUser);

router.route("/change-password").post(verifyJWT, userChangedCurrentPasswordValidator(), validate, changeCurrentPassword);

router.route("/resend-email-verification").get(verifyJWT, resendEmailVerification);

export default router;