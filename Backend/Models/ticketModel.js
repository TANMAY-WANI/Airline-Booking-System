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
    }
  });

const TicketSchema = new schema({
    userID:{
        type:String,
        required:true,
    },
    seatType:{
        type:String,
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

export default mongoose.model("Ticket",TicketSchema)