import mongoose from "mongoose";

const orderSchema =  new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    user:{
        type:Array,
    },
    productID:{
        type:Array,
    },
    size:{
        type:String,
    },
    totalPrice:{
        type:Number,
        
    },
    deliveryCharge:{
        type:Number,
    },
    total:{
        type:Number,
    },
    orderStatus:{
        type:String,
        default:"processing",
    },
    previousOrderStatus:{
        type:String,
        
    },
    paymentVerify:{
        public_id:String,
        url:String,
    },
    paymentMethod:{
        type:String,
        default:"Online",
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      paidAt: {
        type: Date,
      },
   
})

export const Order = mongoose.model('Order',orderSchema);
