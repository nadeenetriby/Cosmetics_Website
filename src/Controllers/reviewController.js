const Review = require("../models/Review");
const Product = require("../models/Product");
const mongoose = require("mongoose");

//create review as a post
const createRev = async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const rev = new Review({
      user: req.user.id,
      product: productId,
      rating,
      comment,
    });
    await rev.save();
    res.status(201).json(rev);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get the average rating of reviews for a particular product

const averageRating = async (productId) => {
  try {
    const average = await Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      { $group: { _id: null, averageRating: { $avg: "$rating" } } },
    ]);
    return average.length > 0 ? average[0].averageRating : 0;
  } catch (error) {
    console.error("Error calculating average rating:", error.message);
    return 0;
  }
};


module.exports = {createRev, averageRating };
