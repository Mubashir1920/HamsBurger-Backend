const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  routeCheck: (req, res) => {
    res.status(200).json({ message: "User Route Working" });
  },
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create a new user
      const newUser = new User({ name, email, password });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering user" });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const newToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      res.status(200).json({ message: "Login successful", token: newToken });
    } catch (error) {
      res.status(500).json({ message: "Error logging in user" });
    }
  },
};
