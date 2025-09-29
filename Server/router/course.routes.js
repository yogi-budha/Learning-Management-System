import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { createCourse, getCourses } from '../controller/course.controller.js'

const router = express.Router()

router.route("/create").post(isAuth,createCourse)
router.route("/getCourses").get(isAuth,getCourses)

export default router