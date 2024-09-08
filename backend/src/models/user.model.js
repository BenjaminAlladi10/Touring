import mongoose from "mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true
    },
    fullName: {
        type: String,
        required: [true, "fullName is required."],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Account already exists."],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least 6 characters long."]
    },
    avatar: {
        type: String,   // cloudinary URL
        required: false
    },

    isAdmin: {
        type: Boolean,
        required: false,
        enum: [true, false],
        default: false
    },

    refreshToken: {
        type: String
    }
}, {timestamps: true});

// pre hook:
userSchema.pre("save", async function (next){

    if(!this.isModified("password")) return next();

    const saltRounds = 10;
    this.password= await bcrypt.hash(this.password, saltRounds);
    // console.log(this.password);
    next();
});

// Generate RefreshToken:
userSchema.methods.generateRefreashTokem= function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

// Generate AccessToken:
userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

const User= mongoose.model("User", userSchema);

export {User};