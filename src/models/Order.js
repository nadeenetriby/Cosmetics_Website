const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        priceAtPurchase: Number,
      },
    ],
    total: Number,
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "canceled"],
      default: "pending",
    },
    paymentDetails: {type:String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
