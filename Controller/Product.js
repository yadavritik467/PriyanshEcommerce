import { Product } from "../Model/Product.js";


export const createAllProducts = async (req, res) => {
    try {
        let { name, image, description, price, category } = req.body;

        const products = await Product.create({
            name, image, description, price, category
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
            products:products.reverse()
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
        return res.status(200).json({
            success: true,
            message:"product successfully deleted"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
export const updateProducts = async (req, res) => {
    try {
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;
        const description = req.body.description;
        const products = await Product.findByIdAndUpdate(req.params.id,{new:true})
        if(!products){
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            })
        }else if( !name ||!category ||!price || !description){
            return res.status(500).json({
                success: false,
                message: 'Please provide all details',
            })
        }else{
            products.name = name;
            products.price = price;
            products.category = category;
            products.description = description;
             await products.save();
             return res.status(200).json({
                 success: true,
                 products:products.reverse()
             })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}