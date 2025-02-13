const Product = require('../models/Product');
const Image = require("../models/Image")

const createProduct = async (req, res) => {
  try {
    const { name, description, price, inStock, imageUrl } = req.body;
    let image = await Image.findOne({ imageName: imageUrl })

    if (!image) {
      return res.status(404).json({ error: "Image not found after multiple attempts" });
    }

    const imageId = image._id;

    const product = new Product({
      name,
      description,
      price,
      imageUrl: imageId,
      inStock,
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
    const { id } = req.params;

    const { name, description, price, inStock, imageUrl } = req.body;

    let image = await Image.findOne({ imageName: imageUrl });
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const imageId = image._id;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        imageUrl: imageId,
        inStock
      },
      { new: true } // This ensures the updated product is returned
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
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

const determineStock = async (req, res) => {
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
const addToStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    const stockAddition = req.body.stockAddition
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (!stockAddition) {
      return res.status(404).json({ error: "Stock cann't be nothing" });
    }
    const newStock = Number(product.inStock) + Number(stockAddition);

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
  determineStock,
  addToStock
}