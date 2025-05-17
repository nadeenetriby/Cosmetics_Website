import React from "react";
import CartItem from "./CartItem";

const CartItemList = ({ cartItems, onIncrease, onDecrease, onRemove }) => {
  return (
    <>
      <h2 style={headerStyle}>🛒 Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#a5698d" }}>
          Your cart is empty.
        </p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))
      )}
    </>
  );
};

const headerStyle = {
  color: "#d6336c",
  marginBottom: "30px",
  borderBottom: "2px solid #f8bbd0",
  paddingBottom: "10px",
};

export default CartItemList;