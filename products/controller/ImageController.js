// ImageController.js
const Image = require('../models/Image'); // Assuming you have an Image model

const uploadImage = async (req, res) => {
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
};
const getImageById = async (req, res) => {
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
        res.status(500).send("Failed to fetch image");
    }
};
const deleteAllImages = async (req, res) => {
    try {

        // Find all images and delete them
        const allImages = await Image.find();
        for (let image of allImages) {
            await Image.findByIdAndDelete(image._id);
        }

        res.status(200).json({ message: 'All images deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to delete all images');
    }
};

// Delete image by ID
const deleteImageById = async (req, res) => {
    try {
        const { id } = req.params;
        await Image.findByIdAndDelete(id);
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to delete image');
    }
};

// Get all images
const getAllImages = async (req, res) => {
    try {
        const allImages = await Image.find();
        res.status(200).json(allImages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch all images');
    }
};

module.exports = { uploadImage, getAllImages, getImageById, deleteAllImages, deleteImageById };
