import express from 'express';
import bcrypt from "bcrypt";
import { Article, User } from "../Database/Schemas.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    console.log("Request body:", req.body);

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password for user:", user.email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Logged in");

    // Save user info to session
    req.session.userId = user._id;
    req.session.email = email;
    
    console.log("Session after login:", req.session);

    

    // Respond with success
    res.status(200).json({
      message: "Logged in successfully",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Failed to handle the request." });
  }
});


router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  // Basic input validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Directly save the plain-text password
    const newUser = new User({
      email,
      password, // Save the password as plain-text
      preferences: [],
    });

    // Save the user in the database
    await newUser.save();

    console.log("Stored password:", password);

    // Respond with success
    res.status(201).json({ message: "Account created successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Failed to create account. Please try again later." });
  }
});


export default router;