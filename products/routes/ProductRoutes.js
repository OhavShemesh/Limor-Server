const express = require("express");
const router = express.Router();

const ProductController = require("../controller/ProductController");

router.post("/", ProductController.createProduct);

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

router.put("/:id", ProductController.updateProduct);

router.delete("/:id", ProductController.deleteProduct);

router.patch("/updateStock/:id", ProductController.updateStock);

module.exports = router;
