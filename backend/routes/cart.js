const express = require("express");
const router = express.Router();
//
// 
// 
const auth = require("../middleware/PromoteAuthen");



// Temporary dummy auth middleware (for testing without token)
/* const auth = (req, res, next) => {
  req.user = { _id: "68235683fd26dda4fb978576" }; // Use a valid userId from your DB
  next();
}; */

const {
  addToCart,
  viewCart,
  deleteFromCart,
  updateQuantity,
} = require("../Controllers/cartController");


//user add to cart
router.post("/addToCart",auth,addToCart)
//view his cart
//router.get("/viewCart", auth, viewCart)

router.get("/viewCart",auth, viewCart); // temporarily no auth



//delet product from the cart
router.delete("/deleteFromCart/:productId",auth,deleteFromCart)



// Update quantity of a product in cart
router.put("/updateQuantity/:productId", auth, updateQuantity);



module.exports = router;