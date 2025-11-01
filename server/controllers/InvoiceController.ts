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
    const decoded = jwt.verify(token , SECRET as string) as 
    {UserId  : string}

    const NewInvoice = new invoice({
        userId : decoded.UserId,
        clientId,
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




