import mongoose from "mongoose";
const schema = mongoose.Schema;

const cardSchema = new schema({
    userID:{
        type:String,
        required:true,
    },
    cardNumber:{
        type:Number,
        required:true,
    },
    cardHolder:{
        type:String,
        required:true,
    },
    cvv:{
        type:Number,
        required:true,
    },
    expiry:{
        type:Date,
        required:true,
    }
})

export default mongoose.model("Cards",cardSchema)