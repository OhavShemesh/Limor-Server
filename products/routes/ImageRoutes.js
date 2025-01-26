// routes/imageRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const ImageController = require('../controller/ImageController');


router.post('/upload-image', upload.single('image'), ImageController.uploadImage);
router.get("/get-image-by-id/:id", ImageController.getImageById);
router.delete("/delete-all-images", ImageController.deleteAllImages);
router.delete("/delete-image-by-id/:id", ImageController.deleteImageById);
router.get("/get-all-images", ImageController.getAllImages);

module.exports = router;
