import {Schema, model} from "mongoose";

const monumentSchema= new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Monument's name must be unique"],
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
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: [true, "location is required"]
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true});


const Monument= model("Monument", monumentSchema);

export {Monument};