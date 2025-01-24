const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const ProductController = require("../controller/ProductController");


router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.delete("/:id", ProductController.deleteProduct);
router.patch("/updateStock/:id", ProductController.updateStock);

module.exports = router;
