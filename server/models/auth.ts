import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    resetToken : String,
    plan : {type : String , enum : ["free" , "pro"], default : "free"},
} , {timestamps : true})

export default mongoose.model("User" , userSchema);