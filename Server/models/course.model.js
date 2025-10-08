import mongoose, { Schema } from "mongoose"

const courseSchema = new Schema({
    courseTitle:{
        type:String,
        required:true
    },
    subTitle:{
        type:String,
    },
    description:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    courseLevel:{
        type:String,
        enum:["beginner","intermediate","advanced"]
    },
    coursePrice:{
        type:Number
    },
    courseThumbnail:{
        type:String,
    },
    enrolledStudent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    Lectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lecture"
        }
    ],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    published:{
        type:Boolean,
        default:false
    }

})

export const Course = mongoose.model("Course",courseSchema)