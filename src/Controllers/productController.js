const Product = require("../models/Product");
const { averageRating } = require("./reviewController");


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

//update producte by id
const updateProduct = async (req, res) => {
  try {
    const id  = req.params.id;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "PRODUCT NOT FOUND" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//delete a product by id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const viewProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();;

    //show avg rating for each product
    const productsWithRatings = await Promise.all(
      products.map(async (product) => {
        const avg = await averageRating(product._id);
        return {
          ...product,
          averageRating: Number(avg.toFixed(1)),
        };
      })
    );

    res.status(200).json(productsWithRatings);      
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//search for a product by name and filter by category
const SearchForProducts = async (req, res) => {
  try {
    const { name, category } = req.query;

    let filter = {};

    if (name) {
      const actualname =name.trim().replace(/\s+/g, '[\\s\\-]*');
      filter.name = { $regex: actualname, $options: 'i' };
    }

    if (category) {
       const categoryPattern = category.trim().replace(/\s+/g, '[\\s\\-]*'); 
      filter.category = { $regex: `^${categoryPattern}$`, $options: 'i' }; 
    }

    const products = await Product.find(filter).lean();;

    //show avg rating for each product
    const productsWithRatings = await Promise.all(
      products.map(async (product) => {
        const avg = await averageRating(product._id);
        return {
          ...product,
          averageRating: Number(avg.toFixed(1)),
        };
      })
    );

    res.status(200).json(productsWithRatings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {createProduct, updateProduct,deleteProduct,viewProducts,SearchForProducts} ;
