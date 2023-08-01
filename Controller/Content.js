import { Content_1 } from "../Model/Content_1.js"
import { Content_2 } from "../Model/Content_2.js"
import { Carousel } from "../Model/Carousel.js"
import cloudinary from "cloudinary"


//  content handler 1 
export const contenthandler_1 = async(req,res) =>{
    try {
        let  description  = req.body.description_1;
        const image = req.body.image_1;

        const myCloud = await cloudinary.v2.uploader.upload(image,{
            folder:"header_1",
            resource_type: "auto",
        })

        const contents = await Content_1.create({
             image: { public_id: myCloud.public_id, url: myCloud.secure_url },
              description,
        })

        return res.status(200).json({
            success: true,
            message:"content update",
            contents

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getAllContent_1 = async(req,res) =>{
    try {
        const content = await Content_1.find({});

        return res.status(200).json({
            success: true,
             content
        })
   

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const contentDelete_1 = async(req,res) =>{
    try {
        await Content_1.findByIdAndDelete(req.params.id);
       return  res.status(200).json({
            success: true,
            message:"content deleted"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//  content handler 2
export const contenthandler_2 = async(req,res) =>{
    try {
        let  description  = req.body.description_2;
        const image = req.body.image_2;

        const myCloud = await cloudinary.v2.uploader.upload(image,{
            folder:"header_2",
            resource_type: "auto",
        })

        const contents = await Content_2.create({
         image: { public_id: myCloud.public_id, url: myCloud.secure_url }, description,
        })

        return res.status(200).json({
            success: true,
            contents
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllContent_2 = async(req,res) =>{
    try {
        const content = await Content_2.find({});

        return res.status(200).json({
            success: true,
             content
        })
   

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const contentDelete_2 = async(req,res) =>{
    try {
        await Content_2.findByIdAndDelete(req.params.id);
       return  res.status(200).json({
            success: true,
            message:"content deleted"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//  carousel handler

export const carouselHandler = async (req,res) =>{
    try {
        const image = req.body.image_3;

        const myCloud = await cloudinary.v2.uploader.upload(image,{
            folder:"carousel",
            resource_type: "auto",
        })

        const contents = await Carousel.create({
         image: { public_id: myCloud.public_id, url: myCloud.secure_url }
        })

        return res.status(200).json({
            success: true,
            contents
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllCarousel = async(req,res) =>{
    try {
        const carousel = await Carousel.find({});

        return res.status(200).json({
            success: true,
             carousel
        })
   

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const carouselDelete = async(req,res) =>{
    try {
        await Carousel.findByIdAndDelete(req.params.id);
       return  res.status(200).json({
            success: true,
            message:"content deleted"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}