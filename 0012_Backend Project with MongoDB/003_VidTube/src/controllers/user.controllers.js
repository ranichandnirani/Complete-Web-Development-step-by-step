import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError} from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
    
        // small check for user existence
    
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
    
    
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password} = req.body

    // validation
    if(
        [fullname, username, email, password].some((field)=>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if(existedUser) {
        throw new ApiError(409, "User with the same username or email already exists")
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // const avatar = await uploadOnCloudinary(avatarLocalPath);
    // let coverImage = "";

    // if(coverLocalPath) {
    //     coverImage = await uploadOnCloudinary(coverImage);
    // }

    let avatar;
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath);
        console.log("Avatar uploaded to Cloudinary:", avatar);
    } catch (error) {
        console.error("Error uploading files to Cloudinary:", error);
        throw new ApiError(500, "Failed to upload avatar");
    }


    let coverImage;
    if (coverLocalPath) {
        try {
        coverImage = await uploadOnCloudinary(coverLocalPath);
        console.log("Cover image uploaded to Cloudinary:", coverImage);
        } catch (error) {
        console.error("Error uploading cover image to Cloudinary:", error);
        throw new ApiError(500, "Failed to upload cover image");
        }
    }

    try {
        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        });
    
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
    
        if(!createdUser) {
            throw new ApiError(500, "Somthing went wrong, while registering a user")
        }
    
        return res
            .status(201)
            .json(
                new ApiResponse(200, createdUser, "User registered successfully")
            )
    
    } catch (error) {
       console.error("User creation failed", error);

       if(avatar) {
        await deleteFromCloudinary(avatar.public_id);
       }

       if(coverImage) {
        await deleteFromCloudinary(coverImage.public_id);
       }
        
       throw new ApiError(500, "Somthing went wrong, while registering a user and images are deleted from cloudinary")
    }
        
});

const loginUser = asyncHandler(async (req, res) => {
    // get data from body

    const { email, username, password } = req.body;

    // validation

    if(!email) {
        throw new ApiError(400, "Email is required")
    }

    const user = await User.findOne({
        $or: [{email}, {username}]
    });

    if( !user) {
        throw new ApiError(404, " User not found");
    }

    // validate password

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully")
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }

    return res
     .status(200)
     .clearCookie("accessToken", options)
     .clearCookie("refreshToken", options)
     .json(new ApiResponse(200, {}, "User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken  = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    try {
        jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id);

        if(!user) {
            throw new ApiError(401, "Invelid refresh token");
        }

        if(incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        return res
         .status(200)
         .cookies("accessToken", accessToken, options)
         .cookies("refreshToken", newRefreshToken, options)
         .json(
            new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed successfully")
         )

    } catch (error) {
        throw new ApiError(500, "Somthing went wrong while refreshing access token");

    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid old password");
    }

    user.password = newPassword;

    await user.save({ validateBeforeSave: false });

    return res
     .status(200)
     .json(
        new ApiResponse(200, {}, "Password changed successfully")
     )
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
     .status(200)
     .json(
        new ApiResponse(200, req.user, "Current user details")
     )
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body;

    if(!fullname) {
        throw new ApiError(400, "Fullname is required")
    }

    if(!email) {
        throw new ApiError(400, "Email is required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,
                email: email
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res
     .status(200)
     .json(
        new ApiResponse(200, user, "Account details updated successfully")
     )
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    // const { fullname, email, username, password} = req.body

    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath) {
        throw new ApiError(400, "File is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url) {
        throw new ApiError(500, "Something went wrong while uploading avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password -refreshToken")

    return res
     .status(200)
     .json(
        new ApiResponse(200, user, "Avatar updated successfully")
     )
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path

    if(!coverImageLocalPath) {
        throw new ApiError(400, "File is required")
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!coverImage.url) {
        throw new ApiError(500, "Something went wrong while uploading cover image")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        { new: true }
    ).select("-password - refreshToken")

    return res
     .status(200)
     .json(
        new ApiResponse(200, user, "Cover image updated successfully")
     )
});


export { 
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage
 };