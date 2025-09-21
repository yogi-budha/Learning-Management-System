import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    photoUrl:{
        type:String,
        default:""
    },
    
    enrolledCourse:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    role:{
        type:String,
        enum:["student","instructor"],
        default:"student"
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)