import mongoose from "mongoose";
const schema = mongoose.Schema;

const transactionSchema = new schema({
    userID:{
        type:String,
        required:true,
    },
    ticketID:{
        type:String,
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    paymentStatus:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    }
})

export default Transaction = new mongoose.model("Transactions",transactionSchema)