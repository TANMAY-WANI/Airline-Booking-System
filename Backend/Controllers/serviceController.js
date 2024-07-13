import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'
import Flight from "../Models/flightModel.js"
import tempBooking from '../Models/tempBooking.js'


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
    },
    handleBooking: async (req,res)=>{
        const userID = req.user.id;
        const {passenger_details,flightID,seatType} = req.body;

        const flight = await Flight.findOne({"_id":flightID})

        if (!flight){
            return res.status(404).json({message:"Flight not found"})
        }

        if (flight.noOfSeats[seatType] < passenger_details.length){
            return res.status(401).json({message:"Seats unavailable"})
        }
        
        const temp = new tempBooking({
            userID,
            seatType,
            passenger_details,
            flightID
        })

        await temp.save()
        return res.status(200).json({tempId:temp._id})
    }
}

export default serviceController


