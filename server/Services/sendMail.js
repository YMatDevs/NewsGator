import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendEmail(to, subject, text)
{
  const mailOptions = {
    from: "yashm.devs@gmail.com",
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;