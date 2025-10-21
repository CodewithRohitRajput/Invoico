import { Request, Response } from 'express'
import express from 'express'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/auth'

export const forgotPassword = async(req : Request , res : Response)=> {
    const {email} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message : "User is not present"});
    }
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetToken = resetToken;
     await user.save();

     console.log('Temporary OTP for ' ,email, ' is ', resetToken)
     return res.status(200).json({Message : "Otp has sent"})
}

export const ResetPassword = async (req : Request , res : Response) => {
    const {resetToken , newPassword} = req.body;

    const user = await User.findOne({resetToken})
    if(!user){
        return res.status(400).json({Message : "Your OTP is wrong"})
    }
    const hashPass = await bcrypt.hash(newPassword , 10);
    user.password = hashPass;
    user.resetToken = undefined;
    await user.save();
    return res.status(200).json({Message : "Password reset successfully"})
}

