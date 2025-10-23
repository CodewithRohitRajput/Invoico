import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db'
import auth from './routes/authRoutes'
import reset from './routes/resetPassRoutes'
import clientRoutes from './routes/clientRoutes'
import cookieParser from 'cookie-parser'

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


 connectDB();

app.listen(port , ()=>{
    console.log(`server is running on ${port}`)
})

