const express = require("express");
const router = express.Router();
const auth = require("../middleware/PromoteAuthen");
const admin = require("../middleware/Adminonly");
const createProduct = require("../Controllers/productController");
const Product = require("../models/Product");

//admin creates a new product
router.post("/createProduct", auth, admin, createProduct);

//get a specific product
router.get("/:productName", async (req, res) => {
  const productName = req.params.productName;
  try {
    const prod = await Product.findOne({ name: productName });
    if (!prod) return res.status(404).json({ msg: "no product found" });
    res.json(prod);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//should do CRUD IN CONTROLLERS AND CALL THEM HERE



module.exports = router;
