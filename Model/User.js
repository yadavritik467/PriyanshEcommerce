import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema({
    googleId:{ type: String,trim:true, },
    name:{
        type:String,
        // require:true,
        trim:true,
    },
    number:{
        type:Number,
        // require:true,
        trim:true,
    },
    email:{
        type:String,
        // require:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        // require:true,
        trim:true,
    },
    address:{
        type:String,
        // require:true,
        trim:true,
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
})

UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateToken = async function (){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}
UserSchema.methods.getResetPasswordToken = async function (){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpires = Date.now() + 10*60*10000;
    // console.log(resetToken)
    return this.resetPasswordToken ;


}

 export const  User = mongoose.model("user",UserSchema)

