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
import  nodemailer from 'nodemailer';


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

// Add Passport Authentication
// Use express Session





// Importing Functions
import { updateNewsArticles } from './Services/updateNewsArticles.js';



// Routes

app.get('/api/updateArticles', (req, res) => {

    updateNewsArticles();

    res.send("Updated articles in database");
})


app.get('/api/sendMail', (req, res) => {

    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use the generated app password here
    },
    });

    const sendEmail = (to, subject, text) => {
        const mailOptions = {
            from: 'yashm.devs@gmail.com',
            to,
            subject,
            text
        };

        return transporter.sendMail(mailOptions);
    }

    sendEmail("anmolbdj1@gmail.com", "TEST", "This is a Test Email sent from a bot");

    res.send('Sending Mail');

})



const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`The App is listening on port ${port}`);
});