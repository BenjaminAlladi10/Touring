import {Schema, model} from "mongoose";

const monumentSchema= new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Monumentname must be unique"],
        index: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: [true, "location is required"]
    },
    prices: [
        {

        }
    ]
}, {timestamps: true});


const Monument= model("Monument", monumentSchema);

export {Monument};