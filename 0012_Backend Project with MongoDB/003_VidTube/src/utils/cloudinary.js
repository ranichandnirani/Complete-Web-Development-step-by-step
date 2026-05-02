import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Configuration
// cloudinary.config({
//   cloud_name: process.env.COUDINARY_CLOUD_NAME,
//   api_key: process.env.COUDINARY_API_KEY,
//   api_secret: process.env.COUDINARY_API_SECRET,
// });

const uploadOnCloudinary = async (localPath, folder) => {
    try {
        if(!localPath) return null
        const response = await cloudinary.uploader.upload(
            localFilePath, {
                resource_type: "auto"
            }
        )
        console.log("File uploaded to cloudinary successfully. File src:" + response.url);
        
        // once the file is uploaded to cloudinary successfully, we would like to dellete it from our server
        fs.unlinkSync(localPath)
        return response
    } catch (error) {
        fs.unlinkSync(localPath)
        return null
    }
}    

export { uploadOnCloudinary };