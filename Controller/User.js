import { User } from "../Model/User.js";
import { sendPasswordResetEmail } from "../utils/sendPassword.js";






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
                // console.log(user)
                return res.status(200)
                .json({
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

export const logOut = async (req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({ success: true, message: "logout successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message, })
    }
}

export const updatePassword = async (req,res) =>{
    try {
        const user = await User.findById(req.user._id);
        const {oldPassword,newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success: false,
                message:"please provide old password and new password"
            })
        }

        const isMatch = await user.matchPassword(oldPassword);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message:"Incorrect old password"
            })
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "password updated"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const forgotPassword = async(req,res) =>{
    try {
        const user = await User.findOne({email:req.body.email})

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const resetPasswordToken = await user.getResetPasswordToken();

        await user.save();

        // const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPasswordToken}`;
        // const resetUrl = `http://localhost:3000/password/reset/${resetPasswordToken}`;
        const resetUrl = `https://priyansh-ecommerce-front.vercel.app/password/reset/${resetPasswordToken}`;
     

        const message = `Reset  your password by clicking on the link below :\n\n${resetUrl}`

        try {
            await sendPasswordResetEmail({
                email:user.email,
                subject:"Reset Password",
                message
            })

            res.status(200).json({
                success: true,
                message:`Link sent to this ${user.email}`
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            res.status(500).json({
                    success: false,
                    message: error.message
                })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const resetPassword = async (req,res)=>{
    try {
        // const resetPasswordToken =  crypto.createHash("sha256").update(req.params.token).digest("hex");
        const resetPasswordToken = req.params.token;

        const user = await User.findOne({
            resetPasswordToken
           
        })
        // console.log(user)
       
        if(!user){
            return res.status(401).json({
                success: false,
                message:"Token is invalid or has expired"
            })
        }

        user.password = req.body.newPassword;
        user.resetPasswordToken = resetPasswordToken;
        // user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({
            success:true,
            message:"password updated"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}

export const updateProfile = async(req,res) =>{
    try {
        const user =  await User.findById(req.params.id);
        const {name,number,email,address} = req.body;
        if(name){
            user.name = name;
        }
        if(number){
            user.number = number;
        }
        if(email){
            user.email = email;
        }
        if(address){
            user.address = address;
        }
        await user.save();
        res.status(200).json({
            success: true,
            message:"profile updated"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteUser = async(req,res) =>{
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}

export const  getAllUsers = async(req,res)=>{
    try {
        const users = await User.find({})
        if(!users){
            return res.status(404).json({
                success: false,
                message: 'No users found',
            })
        }else{
            return res.status(200).json({
                success: true,
                users,
            })    
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}
