import mongoose from "mongoose";
const schema = mongoose.Schema;

const passengerSchema = new schema({
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    seatType:{
        type:String,
        required:true,
    }
  });

const TicketSchema = new schema({
    booking_email:{
        type:String,
        required:true,
    },
    no_of_passengers:{
        type:Number,
        required:true,
    },
    passenger_details:[passengerSchema],
    flightID: {
        type:String,
        required:true,
    },
    cost:{
        type:Number,
        required:true,
    }
})

export default Ticket = mongoose.model("Ticket",TicketSchema)