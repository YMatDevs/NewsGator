// Importing the Express and other Packages
import express from 'express';
import dotenv from 'dotenv';    
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';


// Creating the App
const app = express();

// Routes
import dataRoutes from './Routes/Data.js';
import userRoutes from './Routes/Users.js';
import authRoutes from './Routes/Auth.js';
import contentRoutes from './Routes/Content.js';
import isAuthenticated from './Services/authenticate.js';


// Connecting to Database
mongoose
    .connect("mongodb://127.0.0.1:27017/NewsGator")
    .then(() => { console.log("Server Database Connection established")})
    .catch(() => { console.log("Failed to connect to Database")})


// Using Middleware
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('/public'));
app.use(morgan('common'));
app.use(helmet());
app.use(cookieParser());
app.use(cors());

// Use express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "1234", // Use a secure session secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/NewsGator", // Your MongoDB URL for session storage
    }),
    cookie: {
      httpOnly: true, // Prevent access to cookie via JavaScript
      secure: false, // Set to true in production if using HTTPS
      maxAge: 1000 * 60 * 60 * 5, // 5 hours
    },
  })
);



// Using the Routes
app.use('/data', dataRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/content', contentRoutes);

// Authentication Checker
app.get("/checkAuth", (req, res) => {
  console.log("Route /checkAuth activated");

  // Prevent caching of the response
  res.set({
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
  });

  // Check if the user is logged in
  if (req.session && req.session.userId) {
    return res.status(200).json({ loggedIn: true, user: req.session.userId });
  }

  res.status(401).json({ loggedIn: false });
});



// Setting View Engine
const   __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, '../client/dist'))); 
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});



const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`The App is listening on port ${port}`);
});