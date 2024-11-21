
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logRoute from './route/logRoute.js';
import path from "path";


dotenv.config();

const __dirname = path.resolve();

const app = express();

mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log('MongoDB Connected');
    
}).catch((error)=>{
    console.error(`Error Connecting MongoDB ${error}`)
})


app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
  }));


app.use('/api/logs', logRoute);

app.use(express.static(path.join(__dirname, '/frontend/dist')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
    
})

