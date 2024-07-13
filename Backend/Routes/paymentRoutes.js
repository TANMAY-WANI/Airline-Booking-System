import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authMiddleware from '../Middleware/authMiddleware.js'
import paymentController from '../Controllers/paymentController.js.js'

dotenv.config()

const router = express.Router()
router.use(cors())

router.post("/bookings/pay-now",authMiddleware.verifyUser,paymentController.handlePayment)

router.get("/get-card-details",authMiddleware.verifyUser,paymentController.checkSavedCard)


export default router