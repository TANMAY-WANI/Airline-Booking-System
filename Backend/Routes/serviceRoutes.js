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

router.post("/bookings/proceed-to-pay",authMiddleware.verifyUser,serviceController.handleBooking)

router.get("/bookings/display",authMiddleware.verifyUser,serviceController.getBookings)

router.get("/view-transactions",authMiddleware.verifyUser,serviceController.getTransactions)

router.post("/flights/searchByID",authMiddleware.verifyUser,serviceController.getFlightDetails)


export default router