import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";

import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import sgMail from '@sendgrid/mail';
import QRCode from "qrcode";


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
        throw new ApiError(400, "All fields are required");
    }

    const existingUser= await User.findOne({
        $or: [{username}, {email}]
    });

    if(existingUser)
    {
        throw new ApiError(409, "User with this username or email already exists");
    }

    const avatarLocalPath= req?.file?.path;
    if(!avatarLocalPath)
    {
        throw new ApiError(400, "Monument image is missing");
    }

    const uploadResult= await uploadOnCloudinary(avatarLocalPath);
    if (!uploadResult?.url) 
    {
        throw new ApiError(400, "Error while uploading monument image to cloudinary");   
    }
    const user= await User.create({
        username,
        email,
        fullName,
        password,
        avatar: uploadResult?.url,
        isAdmin: req?.body?.isAdmin
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
        secure: true,
        sameSite: 'None'
    };

    return res.status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, {
        user:dbUser,
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

    const user=await User.findByIdAndDelete(req.body._id).select("-password -refreshToken");

    console.log(req.user._id, user);
    if(!user)
    {
        throw new ApiError(404, "User not found");
    }

    res.status(200)
    .json(new ApiResponse(200, user, "Account deleted"));
});

const getQRCode= asyncHandler(async(req, res)=>{
    const {email, cartItems}= req?.body;

    if(!email || !cartItems || cartItems?.length==0)
    {
        throw new ApiError(400, "Invalid data for QR Code");
    }

    // qrcode:
    const data= JSON.stringify({email, cartItems});

    const qrCode= await QRCode.toDataURL(data);
    // console.log("qrCode:", qrCode);

    if(!qrCode)
    {
        throw new ApiError(500, "Error in generating QR Code");
    }

    // Prepare SendGrid mail options
    const msg = {
        to: req?.user?.email, // Recipient email
        from: process.env.MY_EMAIL, // Verified SendGrid sender email
        subject: 'Here is your QR Code!',
        text: 'Scan the attached QR Code.',
        attachments: [
            {
                content: qrCode.split("base64,")[1], // Extract base64 content
                filename: 'qrcode.png',
                type: 'image/png',
                disposition: 'attachment',
                content_id: 'qrcode'
            }
        ]
    };

    try {
        const info = await sgMail.send(msg); // Send email via SendGrid
        // console.log('Email sent successfully', info);
    } catch (error) {
        console.error("Error in sending mail", error);
        throw new ApiError(500, "Error in sending mail", error);
    }

    res.status(200)
        .json(new ApiResponse(200, { qrCode }, "QR Code generated and email sent successfully"));
});

export {registerUser, loginUser, logoutUser, getCurrentUser, getAllUsers, deleteUser, getQRCode};