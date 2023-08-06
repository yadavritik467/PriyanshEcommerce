import { Order } from "../Model/Order.js";
import cloudinary from "cloudinary"
import  sendOrderEmail  from "../utils/sendOrderDetails.js";

export const newOrderwithOnline = async (req,res) =>{
    try {
        let { 
            userID,
            user,
            productID,
            size,
            totalPrice,
            deliveryCharge,
            total,
            orderStatus,
            previousOrderStatus,
            paymentVerify,
            paymentMethod,
           
        } = req.body.orderDetails;

            const myCloud = await cloudinary.v2.uploader.upload(paymentVerify,{
                folder:"payments",
                resource_type: "auto",
            })

            const order = await Order.create({
                userID,user,productID,size,totalPrice,
            deliveryCharge,total,orderStatus,previousOrderStatus,
            paymentVerify:{ public_id: myCloud.public_id, url: myCloud.secure_url }, 
            paymentMethod,
        
            })
     

        const message = `you got an order from a customer !! `

        
            await sendOrderEmail({
                subject:"Order details",
                message
            })

        

            // console.log(order)
            return res.status(200).json({
                success: true,
                order
            })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const newOrderwithCod = async (req,res) =>{
    try {
        let { 
            userID,
            user,
            productID,
            size,
            totalPrice,
            deliveryCharge,
            total,
            orderStatus,
            previousOrderStatus,
            paymentMethod,
           
        } = req.body.orderDetails;

           

            const order = await Order.create({
                userID,user,productID,size,totalPrice,
            deliveryCharge,total,orderStatus,previousOrderStatus, 
            paymentMethod,
        
            })
     

        const message = `you got an order from a customer !! `

        
            await sendOrderEmail({
                subject:"Order details",
                message
            })

        

            // console.log(order)
            return res.status(200).json({
                success: true,
                order
            })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const getallOrders = async (req, res) => {
    try {
        const order = await Order.find();
        let totalRevenu = 0;

        order.forEach((o)=>{
            totalRevenu = totalRevenu + o.total
        })

        
        return res.status(200).json({
            success:true,
            totalRevenu,
            order:order.reverse(),
        })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateOrder = async (req, res) =>{
    try {
        const order =  await Order.findById(req.params.id,{new:true});
        order.orderStatus = req.body.update;
        await order.save();

        return res.status(200).json({
            message: 'Order updated successfully',
            success:true,
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const deleteOrder = async (req, res) =>{
    try {
       const order = await findByIdAndDelete(req.params.id);
        await cloudinary.v2.uploader.destroy(order.paymentMethod.public_id)
        return res.status(200).json({
            success: true,
            message:"Ordered deleted "
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}