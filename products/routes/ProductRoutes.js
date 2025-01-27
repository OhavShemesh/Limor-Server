const express = require("express");
const router = express.Router();

const ProductController = require("../controller/ProductController");


router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.delete("/:id", ProductController.deleteProduct);
router.patch("/determineStock/:id", ProductController.determineStock);
router.patch("/addToStock/:id", ProductController.addToStock);

module.exports = router;
