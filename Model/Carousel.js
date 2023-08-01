import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    image:{
        public_id:String,
        url:String,
    },
})

export const Carousel = new mongoose.model("carousel",contentSchema)