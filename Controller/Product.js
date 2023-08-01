import { Product } from "../Model/Product.js";
import cloudinary from "cloudinary"

export const createAllProducts = async (req, res) => {
    try {
        let { name, description, price, category } = req.body;
        const image = req.body.image;

        const myCloud = await cloudinary.v2.uploader.upload(image,{
            folder:"products",
            resource_type: "auto",
        })

        const products = await Product.create({
            name, image: { public_id: myCloud.public_id, url: myCloud.secure_url }, description, price, category
        })

        return res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
export const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find()
        return res.status(200).json({
            success: true,
            products: products.reverse()
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
export const deleteProducts = async (req, res) => {
    try {

        const products = await Product.findByIdAndDelete(req.params.id)
        if (!products) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        } else {
            await cloudinary.v2.uploader.destroy(products.image.public_id)
            return res.status(200).json({
                success: true,
                message: "product successfully deleted"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
export const updateProducts = async (req, res) => {
    try {
        const products = await Product.findByIdAndUpdate(req.params.id)
        const { image,name, category, price, description } = req.body;
        if (!products) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            })
        }
        if(image){
          await cloudinary.v2.uploader.destroy(products.image.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(image,{
            folder:"products"
        })
        products.image.public_id = myCloud.public_id;
        products.image.url = myCloud.secure_url;
        }
        if (name) {
            products.name = name;
        }
        if (category) {
            products.category = category;
        }
        if (price) {
            products.price = price;
        }
        if (description) {
            products.description = description;
        }

        await products.save();
        console.log(products);
         res.status(200).json({
            success: true,
            message:"Product updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


