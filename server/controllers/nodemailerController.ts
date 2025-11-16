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
        user : 'rohitsinghrajput964@gmail.com',
        pass : 'xejw ymjr ghqo nepu'
    }
});


export const sendResetPass = async (to : string , resetToken : string)=>{
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
        replyTo : userEmail,
        to : to,
        subject : `Invoice #${invoice.invoiceNumber || invoice._id} from ${invoice.businessName || userEmail}`,
        html : `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
                    .content { background-color: #f9f9f9; padding: 20px; }
                    .invoice-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
                    .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; }
                    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                    th { background-color: #f2f2f2; }
                    .total { font-weight: bold; font-size: 18px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Invoice</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${invoice.clientId?.name || 'Client'},</p>
                        <p>Please find your invoice details below:</p>
                        
                        <div class="invoice-details">
                            <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber || invoice._id}</p>
                            <p><strong>Date:</strong> ${new Date(invoice.createdAt || Date.now()).toLocaleDateString()}</p>
                            <p><strong>Due Date:</strong> ${invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}</p>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Rate</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${invoice.items?.map((item: any) => `
                                    <tr>
                                        <td>${item.description || ''}</td>
                                        <td>${item.quantity || 0}</td>
                                        <td>$${item.price || 0}</td>
                                        <td>$${(item.quantity * item.price) || 0}</td>
                                    </tr>
                                `).join('') || '<tr><td colspan="4">No items</td></tr>'}
                            </tbody>
                        </table>

                        <div class="invoice-details">
                            <p class="total">Total Amount: $${invoice.totalAmount ||  0}</p>
                        </div>

                        <p>If you have any questions, please contact us at ${userEmail}</p>
                    </div>
                    <div class="footer">
                        <p>Thank you for your business!</p>
                    </div>
                </div>
            </body>
            </html>
        `
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