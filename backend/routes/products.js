const express = require("express");
const router = express.Router();
const auth = require("../middleware/PromoteAuthen");
const admin = require("../middleware/Adminonly");

const { createProduct, updateProduct,deleteProduct,viewProducts,SearchForProducts } = require("../Controllers/productController");


const Product = require("../models/Product");

//admin creates a new product
router.post("/createProduct", auth, admin, createProduct);
//admin update specific product
router.patch("/updateProduct/:id", auth, admin, updateProduct);
//admin delete specific product
router.delete("/deleteProduct/:id", auth, admin, deleteProduct)
//any user can viww products
router.get("/viewProducts",viewProducts)

//user can search on product by its name (using regex) and category ==> (search and filter)
router.get("/Search",SearchForProducts)

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
