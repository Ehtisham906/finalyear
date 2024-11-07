import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import donateRouter from './routes/donate.route.js';
import listingRouter from './routes/listing.route.js';
import registerBloodRouter from './routes/register.route.js';
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";


dotenv.config();

const app = express();
// Allow requests from localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
app.use("/api/listing", listingRouter);
app.use("/api/donate", donateRouter);
app.use("/api/registerBlood", registerBloodRouter);

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