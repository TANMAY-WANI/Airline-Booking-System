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
    },
    searchFlight: async (req,res)=>{
        const{src,dest,date_of_travel} = req.body;
        try{
            const flights = await Flight.find({
                "src":src,
                "dest":dest,
                "departure":date_of_travel
            })
            res.send(flights).status(200)
        }catch(err){
            return res.status(404).json({message:"No flights found"})
        }
    }
}

export default serviceController