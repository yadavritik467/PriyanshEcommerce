import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    image: {
        public_id: String,
        url: String,
    },
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

export const Product = mongoose.model("product", ProductSchema)