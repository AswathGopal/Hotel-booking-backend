import express ,{Request,Response} from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import authRoutes from './routes/auth'
import userRoutes from './routes/users';
import myHotelRoutes from './routes/my-hotels'
import hotelRoutes from './routes/hotels';
import cookieparser from 'cookie-parser'
import path from 'path'
import {v2 as cloudinary} from 'cloudinary'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const allowedOrigins = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [];
console.log("allowed origins",allowedOrigins);
app.use(cors({
    origin:allowedOrigins,
    credentials:true,
}))
app.use(cookieparser())
app.use("/api/auth",authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/my-hotels',myHotelRoutes);
app.use('/api/hotels',hotelRoutes)
// app.use(express.static(path.join(__dirname,"../../frontend/dist")))

app.listen(8000,()=>{
    console.log("server is listening at port 8000")
    
})
