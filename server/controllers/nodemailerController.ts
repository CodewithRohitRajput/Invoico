import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { Request , Response } from 'express';
import User from '../models/auth'
import jwt from 'jsonwebtoken'
import invoice from '../models/invoice';

dotenv.config();
const SECRET = process.env.SECRET;
if (!SECRET){
    throw new Error("SECRET is not present in the .env file")
}

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : '',
        pass : ''
    }
});


export const sendResetEmail = async (to : string , resetToken : string)=>{
    const mailOptions = {
        from :process.env.USER_EMAIL,
        to : to,
        subject : '',
        html : `${resetToken}`
    };

    await transporter.sendMail(mailOptions)
}


export const sendOtpEmail = async (to : string , otp : string) => {
    const mailOptions = {
        from : process.env.USER_EMAIL,
        to : to,
        subject : '',
        html : `${otp}`
    }
    await transporter.sendMail(mailOptions);
}



export const sendInvoiceEmail = async (to : string , userEmail : string,  invoice : any) =>{
    
    const mailOptions = {
        from : userEmail,
        to : to,
        subject : '',
        html : ``
    }
    await transporter.sendMail(mailOptions)
}



export const sendInvoiceToClient = async (req : Request , res : Response) => { 
        const {invoiceId} = await req.body;
        const token = req.cookies.token;
        if(!token) return res.status(404).json({message : "token is not present"})
        const decoded = await jwt.verify(token , SECRET as string) as {userId : string};
        if (!decoded) return res.status(404).json({message : "Wrong token present"})
        const userId = decoded.userId;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message : "Not able to find user"})
        
        const invoiceDetail = await invoice.findById(invoiceId).populate('clientId');
    if(!invoiceDetail) return res.status(404).json({message : "No invoice detail present"})

        const clientEmail = (invoiceDetail.clientId as any).email
        if(!clientEmail) return res.status(404).json({message : "Client email is not present"})
          
            const userEmail = (user as any).email
            if(!userEmail) return res.status(404).json({message : "No user email present"})

        await sendInvoiceEmail(
            clientEmail,
            userEmail,
            invoiceDetail
        )

        
        return res.status(200).json({userEmail : user.email});

}