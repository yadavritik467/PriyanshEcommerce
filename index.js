import express from "express";
import cors from "cors";
import {config} from "dotenv"
import mongoose from "mongoose";
import cookie from "cookie-parser"

// Routers

import ProductRouter from "./Routes/Product.js"
import UserRouter from "./Routes/User.js"



config({path:"./config/config.env"});
const app = express();
app.use(express.json());
app.use(cookie());
app.use(cors())

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

app.get("/",(req,res)=>{
    res.send("working");
})

app.listen(Port,()=>{
    console.log(`working on ${Port}`)
})
