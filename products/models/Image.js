const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageName: String,
    imageData: Buffer, // Store the binary data (image file)
    contentType: String, // Optional: store the mime type (e.g., image/jpeg)
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
