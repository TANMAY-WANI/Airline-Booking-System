import mongoose from "mongoose";
const schema = mongoose.Schema;

const FlightSchema = new schema({
    src:{
        type:String,
        required:true,
    },
    dest:{
        type:String,
        required:true,
    },
    departure:{
        type:Date,
        required:true
    },
    arrival:{
        type:Date,
        required:true
    },
    noOfSeats:{
        type: mongoose.Schema.Types.Mixed, 
        required: true,
    },
    price: {
        type: mongoose.Schema.Types.Mixed, 
        required: true,
    }
})

export default mongoose.model("Flights",FlightSchema)