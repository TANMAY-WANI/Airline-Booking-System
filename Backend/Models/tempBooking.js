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
    createdAt: { type: Date, expires: '10m', default: Date.now }
})

export default mongoose.model("tempBookings",TicketSchema)