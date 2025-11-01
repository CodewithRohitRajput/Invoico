import { Request , Response } from "express";
import User from '../models/auth'
import client from "../models/client";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config();

const SECRET = process.env.SECRET
if(!SECRET){
    throw new Error("Secret is not present in the env")
}

export const AllClient = async(req : Request , res : Response) => {
    const token = req.cookies.token
    const decoded = await jwt.verify(token , SECRET as string) as {userId : string}

    const allClient = await client.find({userId : decoded.userId});

    return res.status(200).json({allClient});
}