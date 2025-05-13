const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true }, // total price = price * quantity
      },
    ],
    total: { type: Number, required: true }, // sum of totalPrice for all items
    status: {
      type: String,
      enum: ["pending", "shipped"],
      default: "pending",
    },
    paymentDetails: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
