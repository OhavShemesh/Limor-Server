// imageController.js
const Image = require('../models/Image');

const saveImageToDatabase = (file) => {
    const newImage = new Image({
        imageName: file.originalname, // Store the original file name
        imageData: file.buffer, // Store the file as a Buffer
        contentType: file.mimetype, // Store the MIME type (e.g., image/jpeg)
    });

    return newImage.save(); // Save the image to the database
};

module.exports = { saveImageToDatabase };
