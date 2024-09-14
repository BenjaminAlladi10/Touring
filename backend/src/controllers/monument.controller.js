import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";

import {Monument} from "../models/monument.model.js";
import monumentsData from "../utils/monumentsdata.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addMonument= asyncHandler(async(req, res)=>{
    if(!req?.user?.isAdmin)
    {
        throw new ApiError(403, "Forbidden: Not authorized to perform this action");
    }

    const {name, description, location, price, category}= req?.body;

    if([name, description, location, price, category].some((field)=> !field?.trim()))
    {
        throw new ApiError(400, "All fields are required");
    }

    const existingMonument=await Monument.findOne({name});
    if(existingMonument)
    {
        throw new ApiError(400, "Monument already exists");
    }
    
    const imgLocalPath= req?.file?.path;
    if(!imgLocalPath)
    {
        throw new ApiError(400, "Monument image is missing");
    }

    const uploadResult=await uploadOnCloudinary(imgLocalPath);

    if (!uploadResult?.url) 
    {
        throw new ApiError(400, "Error while uploading monument image to cloudinary");   
    }

    const createdMonument=await Monument.create({
        name,description,location,image:uploadResult?.url,price,category
    });

    const monument= await Monument.findById(createdMonument._id);

    if(!monument)
    {
        throw new ApiError(500, "Something went wrong while adding the monument");
    }

    return res.status(201)
    .json(
        new ApiResponse(201, monument, "Monument added Successfully")
    );
});

const editMonument= asyncHandler(async(req, res)=>{
    if(!req?.user?.isAdmin)
    {
        throw new ApiError(403, "Forbidden: Not authorized to perform this action");
    }
    
    const {_id}= req?.body;
    if(!_id)
    {
        throw new ApiError(400, "Monument ID is required");
    }
    
    const data= req?.body;
    const filteredData= {};

    for (const k in data)
    {
        if(data[k]?.trim())
        {
            filteredData[k]= data[k];
        }
    }

    if (Object.keys(filteredData).length === 0) 
    {
        throw new ApiError(400, "No valid fields provided for update");
    }

    const imageLocalPath= req.file?.path;
    if (imageLocalPath) 
    {
        const imgUploadResult = await uploadOnCloudinary(imageLocalPath);

        if (!imgUploadResult?.url) {
            throw new ApiError(400, "Error uploading new image to Cloudinary");
        }

        filteredData.image = imgUploadResult.url;
    }
    
    const monument= await Monument.findByIdAndUpdate(_id,
        filteredData,
        {new: true}
    );
    
    if(!monument)
    {
        throw new ApiError(404, "Monument not found");
    }

    return res.status(200)
    .json(new ApiResponse(200, monument, "Monument updated successfully"));
});

const deleteMonument= asyncHandler(async(req, res)=>{
    if(!req?.user?.isAdmin)
    {
        throw new ApiError(403, "Forbidden: Not authorized to perform this action");
    }

    const {_id}= req?.body;
    if(!_id)
    {
        throw new ApiError(400, "Monument ID is required");
    }

    const monument=await Monument.findByIdAndDelete(_id);

    if(!monument)
    {
        throw new ApiError(404, "Monument not found");
    }

    return res.status(200)
    .json(new ApiResponse(200, monument, "Monument deleted successfully"));
});

const getMonument= asyncHandler(async(req, res)=>{
    if(!req?.user?.isAdmin)
    {
        throw new ApiError(403, "Forbidden: Not authorized to perform this action");
    }

    const {_id: id}= req?.body;
    if(!id)
    {
        throw new ApiError(404, "Monument ID is required");
    }

    const monument= await Monument.findById(id);

    if(!monument)
    {
        throw new ApiError(404, "Monument not found");
    }
    
    return res.status(200)
    .json(new ApiResponse(200, monument, "Monument fetched successfully"));
});

const getAllMonuments= asyncHandler(async(req, res)=>{
    console.log("Getting all monuments");

    const monuments= await Monument.find({});
    return res.status(200)
    .json(new ApiResponse(200, monuments || monumentsData, "Monuments fetched successfully"));
});


export {addMonument, editMonument, deleteMonument, getMonument, getAllMonuments};