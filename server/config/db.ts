import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI
if(!MONGODB_URI){
    throw new Error("mongo db connection url is not present")
}
const connectDB = async () =>{
    try{
      await  mongoose.connect(MONGODB_URI)
      console.log("MongoDB Connected")
    }catch(err){
        console.error("MongoDB causing Error" , err);
        process.exit(1);
    }
}

export default connectDB;