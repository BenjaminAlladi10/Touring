import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";

import {User} from "../models/user.model.js";


const generateRefreshAndAccessToken= async(id)=>{
    try {
        const user= await User.findById(id);

        if(!user)
        {
            throw new ApiError(500, "Error getting user");
        }

        const refreshToken= user.generateRefreshToken();
        const accessToken= user.generateAccessToken();

        user.refreshToken= refreshToken;
        await user.save({validateBeforeSave: false});

        return {refreshToken, accessToken};
    } 
    catch (error) {
         throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
};

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

    const createdUser= await User.findOne({_id: user._id}).select("-password");

    // console.log(createdUser);

    return res.status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});


const loginUser=asyncHandler(async(req, res)=>{
    const {email, password}= req.body;

    if([email, password].some((field)=> !field?.trim()))
    {
        throw new ApiError(400, "All fields are required");
    }

    const user= await User.findOne({email});

    // console.log(user);

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    // console.log("User found:", user);

    const isPasswordValid= await user.isPasswordCorrect(password);
    if(!isPasswordValid)
    {
        throw new ApiError(401, "Invalid user credentials");
    }


    const {refreshToken, accessToken}= await generateRefreshAndAccessToken(user._id);

    const dbUser= await User.findOne({_id:user._id}).select("-password -refreshToken");

    // console.log("dbUser:", dbUser);

    const options= {
        httpOnly: true,
        secure: true
    };

    return res.status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, {
        user:dbUser,
        refreshToken,
        accessToken
    }, "User Logged in successfully"));
});


const logoutUser= asyncHandler(async(req,res)=>{
    const loginUser= req.user;

    const user= await User.findByIdAndUpdate(loginUser._id,
        {
            $unset: {refreshToken:1}
        }, {new: true});

    const options= {
        httpOnly: true,
        secure: true
    };

    return res.status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});


const getCurrentUser = asyncHandler(async(req, res) => {
    return res.status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})


const getAllUsers= asyncHandler(async(req, res)=>{
    if(!req.user?.isAdmin)
    {
        throw new ApiError(403, "Forbidden: Not authorized to perform this action");
    }

    const users= await User.find({}).select("-password -refreshToken");

    return res.status(200)
    .json(new ApiResponse(200, users, "Fetched all users"));
});

const deleteUser= asyncHandler(async(req, res)=>{
    if(!req.user.isAdmin)
    {
        throw new ApiError(403, "Forbidden: Not authorized to perform this action");
    }

    const user=await User.findByIdAndDelete(req.user._id).select("-password -refreshToken");

    if(!user)
    {
        throw new ApiError(404, "User not found");
    }

    res.status(200)
    .json(new ApiResponse(200, user, "Account deleted"));
});

export {registerUser, loginUser, logoutUser, getCurrentUser, getAllUsers, deleteUser};