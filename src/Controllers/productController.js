const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, inStock, imageUrl, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      inStock,
      imageUrl,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports =  createProduct ;
