/*import React from "react";
import { useCartStore } from "../stores/useCartStore";

const OrderSummary = () => {
  const { subtotal, total } = useCartStore();

  return (
    <div className="border p-6 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button
        disabled={total === 0}
        className="mt-4 w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 disabled:bg-gray-400"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
*/

import React from "react";

const CartSummary = ({ subtotal }) => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#ffd6e8",
        borderRadius: "15px",
        padding: "30px",
        height: "fit-content",
        boxShadow: "0 8px 24px rgba(255, 105, 180, 0.25)",
        marginLeft: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h3
        style={{
          color: "#a83279",
          marginBottom: "25px",
          borderBottom: "2px solid #f8bbd0",
          paddingBottom: "10px",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Order Summary
      </h3>
      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          color: "#800048",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Subtotal: ${subtotal.toFixed(2)}
      </p>

      <button
        onClick={() => alert("Proceeding to checkout")}
        style={{
          backgroundColor: "#d6336c",
          color: "white",
          padding: "15px",
          border: "none",
          borderRadius: "15px",
          fontSize: "18px",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(214, 51, 108, 0.6)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#b82c5a")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#d6336c")}
      >
        Proceed to Checkout
      </button>
      <button
        onClick={() => (window.location.href = "/orders")}
        style={{
          backgroundColor: "#f08eca",
          color: "#6f42c1",
          padding: "15px",
          border: "none",
          borderRadius: "15px",
          fontSize: "18px",
          fontWeight: "700",
          cursor: "pointer",
          marginTop: "15px",
          boxShadow: "0 6px 16px rgba(240, 142, 202, 0.5)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#d87eb8")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#f08eca")}
      >
        View My Orders
      </button>
    </div>
  );
};

export default CartSummary;

/*


import React from "react";

const OrderSummary = ({ subtotal, onCheckout }) => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#ffd6e8",
        borderRadius: "15px",
        padding: "30px",
        height: "fit-content",
        boxShadow: "0 8px 24px rgba(255, 105, 180, 0.25)",
        marginLeft: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h3
        style={{
          color: "#a83279",
          marginBottom: "25px",
          borderBottom: "2px solid #f8bbd0",
          paddingBottom: "10px",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Order Summary
      </h3>
      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          color: "#800048",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Subtotal: ${subtotal.toFixed(2)}
      </p>

      <button
        onClick={onCheckout}
        style={{
          backgroundColor: "#d6336c",
          color: "white",
          padding: "15px",
          border: "none",
          borderRadius: "15px",
          fontSize: "18px",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(214, 51, 108, 0.6)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#b82c5a")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#d6336c")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
*/
