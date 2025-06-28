import os from 'os';
import cluster from 'cluster';
import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const totalCpus = os.cpus().length;
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://localhost:5174"

import { sendEmail } from './lib/nodeMailer.js';
import { connectDB } from './lib/connectDB.js';
import authRoutes from './rotues/auth.routes.js';
import MessageRoutes from './rotues/message.routes.js';

if(cluster.isPrimary){

    for(let i=0; i<totalCpus - 3; i++){
        cluster.fork();
    }

} else {
    const app = express();

   
    app.use(express.urlencoded({ extended: true}))
    app.use(express.json());
    app.use(cookieParser());
    app.use(helmet());
    app.use(cors({
        origin: ["http://localhost:5173", FRONTEND_URL, "https://localhost:5175"],
        methods: ["GET", "POST"],
        credentials: true
    }));
    app.set("view engine", "ejs");
    app.set("views", path.resolve(__dirname, "./views"))
    app.get('/ejs', async(req, res)=>{
        try {
            const html = await ejs.renderFile(__dirname + '/views/test.ejs');
            await sendEmail("nouman.ali.vu@gmail.com", "nodeMailer testing for chat application", html)
            res.json({success:true, message:"test email send successfully"})
        } catch (error) {
            console.error("❌ Error sending email:", error);
            res.status(500).json({ message: "❌ Failed to send email", error });
        }
    })



    app.get('/', (req, res)=>{
        return res.json({success:true, message:`hello cluster nodejs server & worker processor id is ${process.pid}`})
    })

    app.use('/api/auth', authRoutes)
    app.use('/api/message', MessageRoutes)

    app.listen(PORT, ()=>{
        console.log(`✔ Server is running on port ${PORT} with process id: ${process.pid})`)
        connectDB();
    })

    

}
