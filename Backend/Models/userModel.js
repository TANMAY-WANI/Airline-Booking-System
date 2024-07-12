import mongoose from "mongoose";
const schema = mongoose.Schema;

const UserSchema = new schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    staff:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model("User",UserSchema);