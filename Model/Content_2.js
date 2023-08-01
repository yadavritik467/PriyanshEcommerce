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

export const Content_2 = new mongoose.model("content_2",contentSchema)