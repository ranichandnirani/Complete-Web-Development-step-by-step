import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError} from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registrUser = asyncHandler(async (req, res) => {
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

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
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
        throw new ApiError(500, "Failed to upload avatar, please try again later");
    }


    let coverImage;
    try {
        coverImage = await uploadOnCloudinary(coverLocalPath);
        console.log("Cover image uploaded to Cloudinary:", coverImage);
    } catch (error) {
        console.error("Error uploading files to Cloudinary:", error);
        throw new ApiError(500, "Failed to upload cover image, please try again later");
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refresshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Somthing went wrong, please try again later")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User registered successfully")
        )
});

export { registrUser };