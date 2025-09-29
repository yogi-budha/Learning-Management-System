import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

export const createCourse =async (req,res)=>{
    try {
        const {courseTitle, category} = req.body
        const createrId = req.id
        console.log(courseTitle,category)
        if(!courseTitle || !category){
            return res.status(400).json({
                success:false,
                message:"Please fill and select the courseTitle and category"
            })
        }
        const creater =  await User.findById(createrId).select("-password")
        if(!creater){
            return res.status(400).json({
                success:false,
                message:" Creater not found"
            })
        }
        console.log(creater)
        
   const coursedata =  await Course.create({courseTitle,category,creator:createrId})

   return res.status(201).json({
    coursedata,
    creater,
    success:true,
    message:"Course Created successfully "
   })
    } catch (error) {
        console.log(error)
       return res.status(400).json({
            success:false,
            message:"server failed while creating the courses"
        })
        
    }
}

export const getCourses = async (req,res)=>{
    try {
        const creator = req.id
        const createrCourses = await Course.find({creator})
        console.log(createrCourses)
        console.log(creator)
        if(!createrCourses){
            return res.status(400).json({
                success:false,
                message:" courses not found"
            })
        }

        return res.status(200).json({
            createrCourses,
            success:true,
            message:'successfully get the items'
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
             success:false,
             message:"server failed while fetching the courses"
         })
         
    }
}