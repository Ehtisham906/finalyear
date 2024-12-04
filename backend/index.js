import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import donateRouter from './routes/donate.route.js';

import registerBloodRouter from './routes/register.route.js';
import contact from './routes/contact.route.js';
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import User from "./models/user.model.js";
import DonorList from "./models/donor.list.model.js";


dotenv.config();

const app = express();
// Allow requests from localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies to be sent with requests
}));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => {
    console.log(err);
})

const __dirname = path.resolve();

app.use(express.json());

app.use(cookieParser());
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get("/", (req, res) => {
    res.send("Hello World Testing!");
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use("/api/donate", donateRouter);
app.use("/api/registerBlood", registerBloodRouter);
app.use("/api/contact", contact);



app.get('/usernames', async (req, res, next) => {

    const { page = 1, limit = 10 } = req.query; // Defaults: page 1, 10 users per page
    try {
        const users = await DonorList.find({}, { password: 0 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalUsers = await DonorList.countDocuments();
        res.status(200).json({
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page
        });
    } catch (error) {
        next(error);
    }
});

// app.use(express.static(path.join(__dirname, '/frontend/dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// })

//MiddleWare
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});