import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { deleteMediaFromCloudnary, uploadMediaToCloudnary } from "../utils/cloudnary.js";

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

export const editCourse = async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);
  
      const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
      const courseThumbnail = req.file;
      const courseId = req.params.courseId;
  
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(400).json({
          success: false,
          message: "Course not found",
        });
      }
  
      let photoUrl = course.courseThumbnail;
      if (courseThumbnail) {
        if (course.courseThumbnail) {
          const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
          await deleteMediaFromCloudnary(publicId);
        }
  
        const cloudinaryResponse = await uploadMediaToCloudnary(courseThumbnail.path);
        photoUrl = cloudinaryResponse.secure_url;
      }
  
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: photoUrl },
        { new: true }
      );
  
      return res.status(200).json({
        success: true,
        message: "Course updated successfully",
        updatedCourse,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: "Server failed while editing the course",
      });
    }
  };
  


export const getCoursesById = async (req,res)=>{
    try {
        const {courseId} = req.params

        const course = await Course.findById(courseId)
        if(!course) {
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }

        return res.status(200).json({
          course,
            success:true,
            message:"Course found successfully"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
             success:false,
             message:"server failed "
         })
    }
}