const Product = require("../models/Product");
const { averageRating } = require("./reviewController");
const cloudinary = require("../claudinary/cloudinary");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, inStock, image, category } = req.body;

    let cloudinaryResponse = null;
    let imageUrl = "";
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
      imageUrl = cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "";
    }

    const newProduct = await new Product({
      name,
      description,
      price,
      inStock,
      imageUrl: imageUrl,
      category,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update producte by id
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    let cloudinaryResponse = null;

    if (updates.image) {
      cloudinaryResponse = await cloudinary.uploader.upload(updates.image, {
        folder: "products",
      });
      updates.image = cloudinaryResponse.secure_url;
    }

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

    const deletedProduct = await Product.findById(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (deletedProduct.image) {
      const publicId = deletedProduct.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const viewProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();

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
      const actualname = name.trim().replace(/\s+/g, "[\\s\\-]*");
      filter.name = { $regex: actualname, $options: "i" };
    }

    if (category) {
      const categoryPattern = category.trim().replace(/\s+/g, "[\\s\\-]*");
      filter.category = { $regex: `^${categoryPattern}$`, $options: "i" };
    }

    const products = await Product.find(filter).lean();

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

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  viewProducts,
  SearchForProducts,
};
