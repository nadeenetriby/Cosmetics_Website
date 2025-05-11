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

const averageRating = async (req, res) => {
  const { productId } = req.params;
  try {
    const average = await Review.aggregate([
      //filter by id
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      //calculate average
      //_id: null =====> This is telling MongoDB that we don't want to group by any specific field.
      { $group: { _id: null, averageRating: { $avg: "$rating" } } },
    ]);
    if (average.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this product." });
    }
    res.status(200).json({ averageRating: average[0].averageRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRev, averageRating };
