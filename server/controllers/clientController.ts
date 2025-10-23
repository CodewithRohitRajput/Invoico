import express from 'express'
import dotenv from 'dotenv'
import Client from '../models/client'
import { Request , Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/auth'
dotenv.config()
const SECRET = process.env.SECRET
if(!SECRET){
    throw new Error("SECRET is not present in the .env file")
}
export const client = async  (req : Request , res : Response) => {
    const {name , email , phone , address} = req.body;
    const token = req.cookies.token
    const decoded =  jwt.verify(token , SECRET as string) as {userId : string} 
    if(!decoded){ }
    const userId = decoded.userId
    // const user = await User.findById(userId)
    // if(!user) return {}
    // const userid = user.id || user._id
    const newClient = new Client({
        userId : userId,
         name,
        email,
        phone,
        address
    })
    await newClient.save();
    return res.status(200).json({message : "Client is added"});
}


export const getClients = async (req : Request , res : Response) => {
    const token = req.cookies.token
    const decoded = await jwt.verify(token , SECRET as string) as {userId : string}
    const userId = decoded.userId;
    const clients = await Client.find({userId});
    return res.status(200).json({clients});
}