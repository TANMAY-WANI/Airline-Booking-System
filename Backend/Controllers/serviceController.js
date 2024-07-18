import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'
import Flight from "../Models/flightModel.js"
import tempBooking from '../Models/tempBooking.js'


const serviceController = {
    addFlight: async (req,res)=>{
        const {src, dest, departure,arrival,eco,buisness,price_eco,price_buisness} = req.body;


        const obj = {
            src,
            dest,
            departure,
            arrival,
            "noOfSeats":{
                "Economy":eco,
                "Buisness":buisness
            },
            "price":{
                "Economy":price_eco,
                "Buisness":price_buisness
            }
        }

        const flight = new Flight(obj)
        flight.save()


        return res.status(200).json({message:"Saved flight successfully"})
    },
    searchFlight: async (req, res) => {
        const { src, dest, date_of_travel } = req.body;
    
        const startDate = new Date(date_of_travel);
        const endDate = new Date(new Date(date_of_travel).setHours(23, 59, 59, 999)); 
        
        try {
            const flights = await Flight.find({
                src: src,
                dest: dest,
                departure: {
                    $gte: startDate,
                    $lte: endDate
                }
            });
            res.status(200).send(flights);
        } catch (err) {
            console.error('Error querying flights:', err);
            res.status(404).json({ message: "No flights found" });
        }
    },
    
    handleBooking: async (req,res)=>{
        const userID = req.user.id;
        const {passenger_details,flightID} = req.body;

        console.log(passenger_details);
        const flight = await Flight.findOne({"_id":flightID})
        console.log(flight);
        if (!flight){
            return res.status(404).json({message:"Flight not found"})
        }

        let eco = 0,business = 0;

        for (const pass of passenger_details){
            if (pass['seatType']=="Economy"){
                eco++;
            }else{
                business++;
            }
        }
        // console.log();

        if (flight.noOfSeats["Economy"] < eco || flight.noOfSeats["Buisness"]<business){
            return res.status(401).json({message:"Seats unavailable"})
        }
        
        let cost=0;
        console.log(cost);

        for (const passenger of passenger_details){
            const seatType = passenger.seatType;
            console.log(seatType);
            cost+=flight.price[seatType]
        }

        console.log(cost);

        const temp = new tempBooking({
            userID,
            passenger_details,
            flightID,
            cost
        })

        await temp.save()
        return res.status(200).json({tempId:temp._id,cost:cost})
    }
}

export default serviceController


