import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authController from '../Controllers/authController.js'

dotenv.config()

const router = express.Router()
router.use(cors())

// Signup Route
router.post("/signup",authController.signup)

// Login Route
router.post("/login",authController.login)

// check staff status
router.post('/status',authController.status)


export default router

