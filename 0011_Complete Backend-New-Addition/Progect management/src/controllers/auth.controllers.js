// Checking database if user exist or not

import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token");
    }
};

// write method

const registerUser = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body;

    const exixtedUser = await User.findOne({
        $or: [{username}, {email}],
    });

    if(exixtedUser) {
        throw new ApiError(409, "User with email or username alread exists", []);
    }

    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false,
    });

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry

    await user.save({validateBeforeSave: false});

    await sendEmail({
        email: user?.email,
        subject: "Please verify youremail",
        mailgenContent:emailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.ge("host")}/api/v1/usersverify-email/${unHashedToken}`
        ),
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVericationToken -emailVerificationExpiry",
    );

    // Verify
    if(!createdUser) {
        throw new ApiError(500, "Somthing went wrong while registering a user")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            {user: createdUser},
            "User registered successfully and verification email has been sent on your email",
        ),
    );
});

export { registerUser };