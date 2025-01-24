const Product = require('../models/Product');
const Image = require("../models/Image")

const createProduct = async (req, res) => {
  try {
    const { name, description, price, inStock, imageUrl } = req.body;
    const image = await Image.findOne({ imageName: imageUrl })

    const imageId = image._id

    const product = new Product({
      name,
      description,
      price,
      imageUrl: imageId,
      inStock
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(400).json({ error: "Failed to create product", details: err.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product', details: err });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update product', details: err });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product', details: err });
  }
};

const updateStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    const newStock = req.body.newStock
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (!newStock) {
      return res.status(404).json({ error: "Stock cann't be nothing" });
    }
    product.inStock = newStock
    product.save()
    res.status(200).json({ message: 'Product stock updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product stock', details: err });

  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock
}