/*
id string pk
username string
email string
fullName string
avatar string
converImage string
watchHistory ObjectId[]
password string
refreshToken string
createdAt Date
updatedAt Date
*/

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, //URL
            required: true,
        },
        coverImage: {
            type: String, //URL
        },
        watchHistory: [
            {
            type: Schema.Types.ObjectId,
            ref: "Video",
            },
        ],
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
    },
    {timestamps: true}
);

export const User = mongoose.model("User", userSchema);
