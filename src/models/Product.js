const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    inStock: { type: Number, default: 0 },
    imageUrl: String,
    category: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
