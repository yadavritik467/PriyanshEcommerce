import { User } from "../Model/User.js";

export const registerUser = async(req,res) =>{
    try {
        const {name,number,email,password,cpassword,address} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(200).json({
                success: false,
                message: "User already registered",
                existingUser
            })
        }

        else if( !name || !number || !email || !address){
            return res.status(200).json({
                success: false,
                message: "please fill all the details.. ",
                
            })
        }
        else if( name.trim() === ''  || email.trim() === '' || address.trim() === ''){
            return res.status(200).json({
                success: false,
                message: "Empty values are not allowed",
                
            })
        }
        else if( password !== cpassword){
            return res.status(200).json({
                success: false,
                message: "Password mistach",
                
            })
        } else{
            const user =  await User.create({
                name,number,email,password,address
            })
            return res.status(200).json({
                success: true,
                message:"Registered successfully",
                user:user,
            })
        } 
       
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}


export const loginUser = async(req,res) =>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({ email});
        if(!user){
            return res.status(404).json({
                success: false,
                message:"user does not exist",
            })
        } 
        else{
             const isMatch = await user.matchPassword(password);
             if(!isMatch || isMatch === null ){
                return res.status(500).json({
                    success: false,
                    message:"Invalid password or email"
                })
             } else{
                const token = await user.generateToken();
                return res.status(200).json({
                    success: true,
                    message:"login succesfully",
                    user,
                    token
                })
             }
        }
    }  catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}


export const  getAllUsers = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}