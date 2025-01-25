const express = require('express');
const multer = require('multer');
const Image = require('../models/Image'); // Assuming you have an Image model to save the file
const router = express.Router();

// Set up multer to store files in memory as buffers
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle image upload
router.post('/upload-image', upload.single('image'), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Save the image to the database (as a buffer)
        const newImage = new Image({
            imageName: req.file.originalname,
            imageData: req.file.buffer,
            contentType: req.file.mimetype,
        });

        const savedImage = await newImage.save();
        res.status(200).json({ message: 'Image uploaded successfully', image: savedImage });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Error uploading image.');
    }
});

router.get("/get-image/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findById(id);

        if (!image) {
            return res.status(404).send("Image not found");
        }

        // Convert the image buffer to a Base64 string
        const base64Image = image.imageData.toString('base64');

        // Send it as a data URL
        res.status(200).json({
            image: `data:${image.contentType};base64,${base64Image}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
router.delete("/delete-all-images", async (req, res) => {
    try {
        console.log("hello");

        const allImages = await Image.find()
        for (let image of allImages) {
            await Image.findByIdAndDelete(image._id)
        }


    } catch (err) {
        console.log(err);

    }
})
module.exports = router;
