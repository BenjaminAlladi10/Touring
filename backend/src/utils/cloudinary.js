import dotenv from "dotenv";
dotenv.config();

import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary= async(localFilePath)=>{
    try {
        if(!localFilePath)
        {
            console.error("Invalid file path or file does not exist");
            return null;
        }
    
        const response=await cloudinary.uploader.upload(localFilePath,  {
            resource_type: "auto"
        });

        fs.unlinkSync(localFilePath);
        
        // console.log("In", response, response?.url);
        return response;
    } 
    catch (error) {
        console.error("Cloudinary upload error:", error);
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export {uploadOnCloudinary};