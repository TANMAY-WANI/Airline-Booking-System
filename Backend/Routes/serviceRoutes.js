import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { checkStaffStatus } from '../Middleware/authMiddleware.js'
import serviceController from '../Controllers/serviceController.js'
dotenv.config()

const router = express.Router()
router.use(cors())

router.post("/flights/add", checkStaffStatus,serviceController.addFlight)

export default router