import mongoose from "mongoose";
const schema = mongoose.Schema;

const cardSchema = new schema({
    userID:{
        type:String,
        required:true,
    },
    card_number:{
        type:Number,
        required:true,
    },
    holder_name:{
        type:String,
        required:true,
    },
    cvv:{
        type:Number,
        required:true,
    },
    expiry:{
        type:String,
        required:true,
    }
})

export default mongoose.model("Cards",cardSchema)