const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./products/routes/ProductRoutes");
const path = require("path")

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: ["http://localhost:5173", "https://limor-front.onrender.com"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect("mongodb+srv://Limor:Limor2025@limor.elzex.mongodb.net/?retryWrites=true&w=majority&appName=Limor")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
