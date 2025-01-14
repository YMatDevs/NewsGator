// Importing the Express App
import express from 'express';

// Importing Packages
import dotenv from 'dotenv';    
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
// import { JsonWebTokenError } from 'jsonwebtoken';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

// Connecting to Database
mongoose
    .connect("mongodb://127.0.0.1:27017/NewsGator")
    .then(() => { console.log("Server Database Connection established")})
    .catch(() => { console.log("Failed to connect to Database")})


// Using Middleware
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('/public'));
app.use(morgan('common'));
app.use(helmet());
app.use(cookieParser());

// Setting View Engine
const   __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, '../client/dist'))); 
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

// Add Passport Authentication
// Use express Session



// Routes
import dataRoutes from './Routes/Data.js';
import userRoutes from './Routes/Users.js';
// import authRoutes from './Routes/Auth.js';

// Using the Routes
app.use('/data', dataRoutes);
app.use('/user', userRoutes);
// app.use('/auth', authRoutes);


const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`The App is listening on port ${port}`);
});