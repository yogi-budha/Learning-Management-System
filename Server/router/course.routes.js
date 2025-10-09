import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { createCourse, createLecture, editCourse, editLecture, getCourseLecture, getCourses, getCoursesById, getLecture, publishUnpublish, removeLecture } from '../controller/course.controller.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

router.route("/create").post(isAuth,createCourse)
router.route("/getCourses").get(isAuth,getCourses)
router.route("/:courseId").put(isAuth, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").patch(isAuth,publishUnpublish);

router.route("/:courseId").get(isAuth,getCoursesById)
router.route("/:courseId/lecture").post(isAuth,createLecture)
router.route("/:courseId/lecture").get(isAuth,getCourseLecture)
router.route("/:courseId/lecture/:lectureId").post(isAuth,editLecture)
router.route("/lecture/:lectureId").get(isAuth,getLecture)
router.route("/lecture/:lectureId").delete(isAuth,removeLecture)

export default router