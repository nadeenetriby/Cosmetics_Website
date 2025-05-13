const express = require("express");
const router = express.Router();
const auth = require("../middleware/PromoteAuthen");
const {addToCart,viewCart,deleteFromCart} = require("../Controllers/cartController")


//user add to cart
router.post("/addToCart",auth,addToCart)
//view his cart
router.get("/viewCart", auth, viewCart)
//delet product from the cart
router.delete("/deleteFromCart/:productId",auth,deleteFromCart)


module.exports = router;