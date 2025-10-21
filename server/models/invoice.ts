import mongoose from "mongoose";


const invoiceSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    clientId : {type : mongoose.Schema.Types.ObjectId , ref : "Client"},
    invoiceNumber : {type : String , unique : true},

      items: [{
        description: { type: String},
        quantity: { type: String },
        price: { type: Number},
        total: { type: Number}
    }],
    
    totalAmount : Number,
    status : {type : String , enum : ["Paid" , "Unpaid"] , default : "Unpaid"},
    issueDate : {type : Date , default : Date.now},
    dueDate : {type : Date},
    notes : String
} , {timestamps : true})

export default mongoose.model("Invoice" , invoiceSchema)