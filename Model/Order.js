import mongoose from "mongoose";

const orderSchema =  new mongoose.Schema({
    name:{
        type:String,
    },
    number:{
        type:Number,
    },
    email:{
        type:String,
    },
    address:{
        type:String,
    },
    ProductName:{
        type:String,
    },
    productPrice:{
        type:Number,
    },
   
})