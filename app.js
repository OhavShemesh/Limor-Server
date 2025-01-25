const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./products/routes/ProductRoutes");
const imageRoutes = require("./products/routes/ImageRoutes")
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { saveImageToDatabase } = require("./products/controller/ImageController");

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: ["http://localhost:5173", "https://limor-front.onrender.com", "https://limor-front.onrender.com/"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};


app.use(cors(corsOptions));
app.use(express.json());

const connectDB = async () => {
  try {
    const dbUri =
      process.env.NODE_ENV === "production"
        ? "mongodb+srv://Limor:Limor2025@limor.elzex.mongodb.net/?retryWrites=true&w=majority&appName=Limor" // Production (Atlas)
        : "mongodb://localhost:27017/LimorDahari"; // Development (Local)

    await mongoose.connect(dbUri);

    console.log(`Connected to MongoDB (${process.env.NODE_ENV || "development"})`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

app.get("/env-info", (req, res) => {
  const envInfo = {
    environment: process.env.NODE_ENV || "development",
    database:
      process.env.NODE_ENV === "production"
        ? "MongoDB Atlas (Production)"
        : "Local MongoDB",
  };

  res.json(envInfo);
});

app.use((err, req, res, next) => {
  console.error("Error in production:", err);
  res.status(500).json({ error: "Internal server error", details: err.message });
});



app.use("/", imageRoutes)
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
