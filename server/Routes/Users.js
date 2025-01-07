import express from 'express';

const router = express.Router();

router.get("/sendMail", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use the generated app password here
    },
  });

  const sendEmail = (to, subject, text) => {
    const mailOptions = {
      from: "yashm.devs@gmail.com",
      to,
      subject,
      text,
    };

    return transporter.sendMail(mailOptions);
  };

  sendEmail(
    "abijeet.mpr@gmail.com",
    "In the Crpto Lab",
    "This is a Test Email sent from a bot"
  );

  res.send("Sending Mail");
});

export default router;
