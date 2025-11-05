import { Request , Response } from "express";
import invoice from "../models/invoice";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const SECRET = process.env.SECRET

if(!SECRET){
    throw new Error("SECRET is not present in the env file")
}

export const InvoiceCreate = async (req : Request , res : Response) => {

    const {clientId , items , totalAmount, status , dueDate , notes} = req.body;

    const token = req.cookies.token
    const decoded = jwt.verify(token , SECRET as string) as {userId  : string}

    const count = await invoice.countDocuments();
    const invoiceNumber = `INV-${Date.now()}-${count + 1}`

    const NewInvoice = new invoice({
        userId : decoded.userId,
        clientId,
        invoiceNumber,
        items,
        totalAmount,
        issueDate : Date.now(),
        status,
        dueDate,
        notes
    })

    await NewInvoice.save();
return res.status(200).json({message : "Invoice is saved"})
};


export const getInvoice = async (req :Request , res : Response) =>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message : "No Token found"})
        const decoded = await jwt.verify(token , SECRET as string) as {userId : string};
    if(!decoded) return res.status(401).json({message : "Sorry, We are not able to find the user"})
        const allInvoice = await invoice.find({userId : decoded.userId}).populate('clientId')
    return res.status(200).json({allInvoice});
}




