// const express = require('express');
// const app = express();


// app.listen(3000, () => {
//   console.log('🚀 Server running on http://localhost:3000');
// });




// ✅ server.js (CommonJS)

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MONGO URI from .env
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/userDB";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Schema: User
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  phone: String,
  password: String,
  role: { type: String, enum: ["patient", "doctor", "admin"], default: "patient" },
  patientId: String,
  doctorCode: String,
  resetToken: String,
  resetTokenExpiry: Date,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// ✅ Schema: Appointment
const appointmentSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  email: String,
  gender: String,
  healthCondition: String,
  preferredTime: String,
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);


const path = require('path');
require('dotenv').config();

// Middleware to serve static frontend files
app.use(express.static(__dirname));

// Example route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ Example route (browser test)
app.get("/", (req, res) => {
  res.send("Hello from AyurSutra backend!");
});


// ✅ REGISTER (called from frontend as /register)
app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, role, age, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "patient",
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ SIGNIN (called from frontend as /signin)
app.post("/signin", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    if (role && user.role !== role) {
      return res.status(400).json({ error: "Invalid role selection" });
    }

    res.json({ message: "Login successful!", user });
  } catch (err) {
    console.error("❌ Signin error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/login", (req, res) => {
  console.log("Login route hit");
  res.status(200).json({ message: "Backend connected successfully" });
});





// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
