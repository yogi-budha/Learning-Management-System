import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { createCourse, editCourse, getCourses, getCoursesById } from '../controller/course.controller.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

router.route("/create").post(isAuth,createCourse)
router.route("/getCourses").get(isAuth,getCourses)
router.route("/:courseId").put(isAuth, upload.single("courseThumbnail"), editCourse);

router.route("/:courseId").get(isAuth,getCoursesById)

export default router