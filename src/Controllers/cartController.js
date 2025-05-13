const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    //get the user id from header (token)
   const userId = req.user._id;

    const { productId, quantity = 1 } = req.body;
   //find the product he select
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const price = product.price;

    /*check if he already had a cart  if not
    creat new ine
    */ 
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity, price }],
        total: price * quantity,
      });

    } else {
    //if had cart => check if the product exist so just increment quantity by one 
      const existingItem = cart.items.find((item) => item.productId.toString() === productId);

      if (existingItem) {
        //increment quantity by 1
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price });
      }
    //calculate total price to all products(iteams) in rhe cart
      cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const viewCart = async (req, res) => {
  try {
    //get the user id from header request
    const userId = req.user._id; // middleware auth

    const cart = await Cart.findOne({userId})
      .populate("items.productId", "name imageUrl category") // just show importent info(name,image,category)
      .exec();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // search about rhe cart of current user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // remove the product frim the items list
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // update the total
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports={addToCart,viewCart,deleteFromCart}