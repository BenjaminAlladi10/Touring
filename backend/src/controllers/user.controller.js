import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";

import {User} from "../models/user.model.js";

const registerUser= asyncHandler(async(req, res)=>{
    const {username, fullName, email, password}= req.body;

    console.log(req.body);
    if([username, fullName, email, password].some((field)=> !field?.trim()))
    {
        // console.log("fields missing");
        throw new ApiError(400, "All fields are required");
    }

    const existingUser= await User.findOne({
        $or: [{username}, {email}]
    });

    if(existingUser)
    {
        throw new ApiError(409, "User with this username or email already exists");
    }

    const user= await User.create({
        username,
        email,
        fullName,
        password
    });

    const createdUser= await User.findOne({
        $or: [{username}, {email}]
    }).select("-password");

    // console.log(createdUser);

    return res.status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export {registerUser};