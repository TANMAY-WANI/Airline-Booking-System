import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'
import Flight from "../Models/flightModel.js"

const serviceController = {
    addFlight: async (req,res)=>{
        const {src, dest, departure,arrival,eco,buisness} = req.body;

        const obj = {
            src,
            dest,
            departure,
            arrival,
            "noOfSeats":{
                "Economy":eco,
                "Buisness":buisness
            }
        }

        const flight = new Flight(obj)
        flight.save()


        return res.status(200).json({message:"Saved flight successfully"})
    }
}

export default serviceController