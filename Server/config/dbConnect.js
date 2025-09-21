import mongoose from "mongoose";

async function connectDB(){
    try {
       await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("mongodb connected ")
       })
    } catch (error) {
        console.log("error while connect to mongodb",error.message)
        
    }
}

export default connectDB