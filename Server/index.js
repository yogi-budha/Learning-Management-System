import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connectDB from "./config/dbConnect.js"
import userRouter from './router/user.routes.js'
import cookieParser from "cookie-parser"
import { cloudnaryConfig } from "./config/cloudinaryConfig.js"
import courseRouter from './router/course.routes.js'
import mediaRouter from './router/media.routes.js'
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
))
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"welcome this works successsfully"
    })
})

// user api

app.use("/api/user",userRouter)
app.use("/api/course",courseRouter)
app.use("/api/media",mediaRouter)

app.listen(PORT,()=>{
    connectDB()
    cloudnaryConfig()
    console.log("Server started successfully")
})