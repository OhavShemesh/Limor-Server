const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    required: false
  },
  inStock: {
    type: Number,
    default: 0
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
