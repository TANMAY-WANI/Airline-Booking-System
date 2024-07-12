import mongoose from "mongoose";
const schema = mongoose.Schema;

const FlightSchema = new schema({
    source:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    departure_datetime:{
        type:Date,
        required:true
    },
    arival_datetime:{
        type:Date,
        required:true
    },
    noOfSeats:{
        type: mongoose.Schema.Types.Mixed, 
        required: true,
    }    
})

export default Flight = new mongoose.model("Flights",FlightSchema)