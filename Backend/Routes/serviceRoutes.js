import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authMiddleware from '../Middleware/authMiddleware.js'
import serviceController from '../Controllers/serviceController.js'
dotenv.config()

const router = express.Router()
router.use(cors())

router.post("/flights/add", authMiddleware.verifyUser,authMiddleware.checkStaff,serviceController.addFlight)

router.post('/flights/search',authMiddleware.verifyUser,serviceController.searchFlight)

export default router