import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db'
import auth from './routes/authRoutes'
import reset from './routes/resetPassRoutes'
import clientRoutes from './routes/clientRoutes'
import cookieParser from 'cookie-parser'
import invoiceCreate from './routes/invoiceRoutes'
import  allClientRoute from './routes/allClientRoute'
const app = express()
const port = 5000;

dotenv.config()
app.use(express.json())
app.use(cookieParser())

app.use(cors({

    origin : ["http://localhost:3000"],
    credentials : true
}
));


app.use('/auth' , auth)
app.use('/reset' , reset)
app.use('/client', clientRoutes)
app.use('/invoice', invoiceCreate)
app.use('/list-client' , allClientRoute )


 connectDB();

app.listen(port , ()=>{
    console.log(`server is running on ${port}`)
})

