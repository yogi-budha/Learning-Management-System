import express from 'express'
import { getUserDetails, login, logout, register } from '../controller/user.controller.js'
import { isAuth } from '../middlewares/isAuth.js'

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/getUser").get(isAuth,getUserDetails)

export default router