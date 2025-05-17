import React, { useEffect } from "react";
import CartItemList from "../components/CartItemList";
import CartSummary from "../components/CartSummary";
import { useCart } from "../stores/useCart";

const CartPage = () => {
  const {
    cartItems,
    loading,
    error,
    fetchCartData,
    updateCartItems,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    fetchCartData();
  }, []);
  const handleIncrease = (productId) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCartItems(updatedItems);
  };

  const handleDecrease = (productId) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCartItems(updatedItems);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId._id).then(()=>{
      fetchCartData()
    })
  };

  // const subtotal = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        padding: "40px",
        boxSizing: "border-box",
        backgroundColor: "#fff0f6",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          flex: 2,
          paddingRight: "30px",
          overflowY: "auto",
          borderRight: "2px solid #f8bbd0",
        }}
      >
        <CartItemList
          cartItems={cartItems}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
        />
      </div>
      {/* <CartSummary subtotal={subtotal} /> */}
    </div>
  );
};

export default CartPage;
