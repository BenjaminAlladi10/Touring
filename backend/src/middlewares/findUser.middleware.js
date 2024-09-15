import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

import jwt from "jsonwebtoken";

const findUser= asyncHandler(async(req, res, next)=>{
    try {
        const accessToken= req.cookies?.accessToken;
        // console.log("accessToken:", accessToken);

        if(!accessToken)
        {
            throw new ApiError(401, "Unauthorized request");
        }

        const payload= jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        console.log("JWT Payload:", payload);

        const user= await User.findById(payload._id).select("-password -refreshToken");
        if(!user)
        {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user= user;
        console.log(req.user, user);
        next();
    } 
    catch (error) {
        throw new ApiError(401, error?.message || "Error in user authentication");
    }
});

export {findUser};