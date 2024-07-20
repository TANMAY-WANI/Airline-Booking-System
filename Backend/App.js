import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './Routes/authRoutes.js'
import serviceRoutes from "./Routes/serviceRoutes.js"
import paymentRoutes from "./Routes/paymentRoutes.js"
import cron from 'node-cron'
import deleteExpiry from './Tasks/deleteExpired.js'


dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors({
    origin:"http://airline-booking-frontend.s3-website.ap-south-1.amazonaws.com",
}));
app.use(express.json());
app.use("/auth",authRoutes)
app.use("/api",serviceRoutes)
app.use("/pay",paymentRoutes)


mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection;


db.once("open",()=>{
    console.log("Connected to MongoDB");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


cron.schedule('0 0 * * *', () => {
    deleteExpiry();
  });