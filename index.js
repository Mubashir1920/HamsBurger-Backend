const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
  })
);

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

const orderRoutes = require("./routes/Order");

// Middleware

// Routes
app.use("/api/order", orderRoutes);

// Routes
app.get("/api", (req, res) => {
  // console.log("API is running");
  res.send("Welcome to the HAMSBURGER App API!");
});

mongoose
  .connect(MONGOURL)
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
