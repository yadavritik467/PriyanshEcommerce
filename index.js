import express from "express";
import cors from "cors";
import {config} from "dotenv"
import mongoose from "mongoose";
import cookie from "cookie-parser"
import cloudinary from "cloudinary";
import passport from "passport";

// import fileUpload from "express-fileupload";


// Routers

import ProductRouter from "./Routes/Product.js"
import UserRouter from "./Routes/User.js"
import ContentRouter_1 from "./Routes/Content_1.js"
import ContentRouter_2 from "./Routes/Content_2.js"
import CaroRouter from "./Routes/Carousel.js"

import OrderRouter from "./Routes/Order.js"
import { connectPassport } from "./Controller/User.js";





config({path:"./config/config.env"});
const app = express();
app.use(passport.initialize());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cookie());
app.use(cors())

connectPassport();

// app.use('/',express.static('./Frontend/build/'))




cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_KEY_SECRET,
    url:process.env.CLOUD_URL,
})

// connection to Db

const MongoDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error,"not Connected to MongoDB")
    }
}
MongoDB();


const Port = process.env.Port;




// importing routes

app.use("/api/v1",ProductRouter)
app.use("/api/v1",UserRouter)
app.use("/api/v1",ContentRouter_1)
app.use("/api/v1",ContentRouter_2)
app.use("/api/v1",CaroRouter)
app.use("/api/v1",OrderRouter)
// app.use("/auth",UserRouter)



app.get("/",(req,res)=>{
    res.send("working");
})

app.listen(Port,()=>{
    console.log(`working on ${Port}`)
})
