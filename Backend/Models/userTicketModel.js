import mongoose from "mongoose";
const schema = mongoose.Schema;

const bookedTicketSchema = new schema({
    userID:{
        type:String,
        required:true,
    },
    ticketID:{
        type:String,
        required:true,
    }
})

export default  mongoose.model("BookedTickets",bookedTicketSchema)