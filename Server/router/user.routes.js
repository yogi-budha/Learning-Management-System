import express from 'express'
import { getUserDetails, login, logout, register, updateUser } from '../controller/user.controller.js'
import { isAuth } from '../middlewares/isAuth.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/getUser").get(isAuth,getUserDetails)
router.route("/updateUser").put(isAuth,upload.single('imageFile'),updateUser)

export default router