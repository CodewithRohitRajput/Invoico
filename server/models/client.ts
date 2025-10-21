import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    name : String,
    email : String,
    phone : String,
    address : String
})

export default mongoose.model('Client' , clientSchema)