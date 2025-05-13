const express = require("express");
const router = express.Router();
const auth = require("../middleware/PromoteAuthen");
const createOrderFromCart = require("../Controllers/orderController");
const Order = require("../models/Order");

router.post("/placeOrder", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const order = await createOrderFromCart(userId);

    res.status(200).json({
      message: "Order placed successfully",
      order: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "An error occurred while placing the order",
    });
  }
});

router.get("/order", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});
module.exports = router;
