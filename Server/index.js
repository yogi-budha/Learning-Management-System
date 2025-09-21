import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connectDB from "./config/dbConnect.js"
import userRouter from './router/user.routes.js'
import cookieParser from "cookie-parser"

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

app.listen(PORT,()=>{
    connectDB()
    console.log("Server started successfully")
})