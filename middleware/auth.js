import  {User} from "../Model/User.js";
import jwt from "jsonwebtoken"
export const isAuthenticated = async(req,res,next) =>{
   try {
    const token =  req.header('Authorization')
        const decode =   jwt.verify(token,process.env.JWT_SECRET)
        req.user = decode;
        console.log(req.user,token,"hii")
        next();
   } catch (error) {
    console.log(error.message);
    res.status(404).json({
        message:error.message,
    })
   }
}

export const isAdmin = async(req,res,next) => {
    try {
        const user = await User.findById(req.user._id);
        if(user.role !== 'admin'){
            return res.status(401).json({
                message:"UnAuthorized access"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            message:error.message,
        })
    }
}