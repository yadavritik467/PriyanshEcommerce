import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    image:{
        public_id:String,
        url:String,
    },
    description:{
        type:String
    }
})

export const Content_1 = new mongoose.model("content",contentSchema)