const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    inStock: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Pending Review"],
      default: "In Stock",
    },
    imageUrl: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
