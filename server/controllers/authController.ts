import { Request , Response } from "express";
import { Express } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/auth'
import dotenv from 'dotenv'
dotenv.config();

const SECRET = process.env.SECRET;
if(!SECRET){
    throw new Error("Secret is not there in the env file")
}
export const registerUser = async (req : Request , res : Response) => {
    try{
        const {name , email , password} = req.body;
        const userExist = await User.findOne({email});
        if(userExist) return res.status(401).json({Message : "User already exists"});

        const hashPass = await bcrypt.hash(password , 10);

        const newUser = new User({name , email , password : hashPass});

        await newUser.save();

        const token = jwt.sign({userId : newUser._id} , SECRET as string, {expiresIn  : '7d'})

          res.cookie('token' , token , {
        httpOnly : true,
        sameSite : 'lax',
        path : '/',
        maxAge : 3600000,
        secure : false
    })

        return res.status(201).json({
            message : "User Registered Successfully" , token
        })

    }catch (err){
        return res.status(500).json({message : "Registration failed"})
    }
}


export const loginUser = async (req : Request , res : Response) => {
    try{

        const {email , password} = req.body;
        const isUser = await User.findOne({email}) as any;
        if(!isUser) return res.status(401).json({Message : "User do not exist"})
            
            const chkPass = await bcrypt.compare(password , isUser.password)
            if(!chkPass) return res.status(401).json({message : "Password is incorrect"});
            
            const token = await jwt.sign({userId : isUser._id} , SECRET as string , {expiresIn : '7d'})
            res.cookie('token' , token , {
                httpOnly : true,
                sameSite : 'lax',
                path : '/',
                maxAge : 3600000,
                secure : false
            })
            
            return res.status(200).json({Message: "LoggedIn successfully" , token})
        }catch(err){
            return res.status(401).json({message : "Internal server error"})
        }
}


export const profile = async (req : Request , res : Response) => {
    try{

        const token = req.cookies.token
        if(!token) return res.status(400).json({message : "Token not available" , isLogedIn : false})
            const decoded = jwt.verify(token , SECRET as string) as {userId : string};
        if(!decoded) return res.status(400).json({Message : "Invalid Token" , isLogedIn : false})
            const user = await User.findById(decoded.userId);
        return res.status(200).json({ name : user?.name ,email : user?.email , plan : user?.plan , isLogedIn : true});
    }catch(err){
        return res.status(500).json({message :"Server Issue" , isLogedIn : false})
    }
}

