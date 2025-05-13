const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");


//submitting ordered 
async function createOrderFromCart(userId) {


  // Fetch the cart for the user
  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart) {
    throw new Error("Cart not found for the user");
  }

  const items = [];
  let total = 0;

  // Process each item in the cart and calculate total
  for (const item of cart.items) {
    const totalPrice = item.productId.price * item.quantity; // total = price * quantity
    items.push({
      productId: item.productId._id,
      quantity: item.quantity,
      totalPrice,
    });
    total += totalPrice; 
    
   
    await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity }, // Decrease stock by ordered quantity
    });
  }
    

  // Create a new order
  const order = new Order({
    userId,
    items,
    total,
    paymentDetails: "Paid Cash", 
  });

  await order.save();

  // clear the cart 
  await Cart.findOneAndUpdate({ userId }, { $set: { items: [], total: 0 } });

  //This is for status from pendding to shipped
  setTimeout(async()=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(order._id, { status: "shipped" }, { new: true });
        console.log(`Order ${updatedOrder._id} status updated to "shipped"`);
      }
      catch (error) {
            console.error("Error updating order status to shipped:", error);
          }
      }, 120000);

  return order; 
}
module.exports = createOrderFromCart;
