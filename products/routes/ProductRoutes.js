const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const ProductController = require("../controller/ProductController");

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files to the "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to avoid name conflicts
    }
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Initialize multer
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "uploads/"),
        filename: (req, file, cb) =>
            cb(null, Date.now() + "-" + file.originalname),
    }),
});

router.post("/", upload.single("imageUrl"), ProductController.createProduct);

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", upload.single("image"), ProductController.updateProduct); // Allow image updates
router.delete("/:id", ProductController.deleteProduct);
router.patch("/updateStock/:id", ProductController.updateStock);

module.exports = router;
