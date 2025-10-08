import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { createCourse, createLecture, editCourse, getCourseLecture, getCourses, getCoursesById } from '../controller/course.controller.js'
import { upload } from '../utils/multer.js'
import { uploadMediaToCloudnary } from '../utils/cloudnary.js'

const router = express.Router()

router.route("/create").post(isAuth,createCourse)
router.route("/getCourses").get(isAuth,getCourses)
router.route("/:courseId").put(isAuth, upload.single("courseThumbnail"), editCourse);

router.route("/:courseId").get(isAuth,getCoursesById)
router.route("/:courseId/lecture").post(isAuth,createLecture)
router.route("/:courseId/lecture").get(isAuth,getCourseLecture)

router.route("/upload-video", async (req,res) => {
    try {
        console.log(req.file.path)
      const res = uploadMediaToCloudnary(req.file.path)
      
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        success:false,
        message:"server failed"
      })
    }
  })

export default router