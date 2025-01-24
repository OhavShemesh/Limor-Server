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

mongoose
  .connect("mongodb+srv://Limor:Limor2025@limor.elzex.mongodb.net/?retryWrites=true&w=majority&appName=Limor")
  //.connect("mongodb://localhost:27017/LimorDahari")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/", imageRoutes)
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
