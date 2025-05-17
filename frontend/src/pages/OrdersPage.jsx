import React, { useEffect } from "react";
import { useOrderStore } from "../stores/useOrderStore";

const OrdersPage = () => {
  const { orders, loading, error, getUserOrders } = useOrderStore();

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div style={{ padding: "40px", backgroundColor: "#fff0f6", minHeight: "100vh" }}>
      <h2 style={{ color: "#d6336c", textAlign: "center", marginBottom: "30px" }}>
        Your Past Orders
      </h2>

      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div key={order._id} style={{ backgroundColor: "#f9e6f2", padding: "20px", marginBottom: "20px", borderRadius: "12px" }}>
          <h3 style={{ color: "#a83279" }}>Order ID: {order._id}</h3>
          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>
                {item.quantity} × {item.productId?.name || "Unnamed Product"} — ${ (item.productId?.price || 0).toFixed(2) }
              </li>
            ))}
          </ul>
          <p><strong>Total Paid:</strong> $
            {order.items.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0).toFixed(2)}
          </p>
          <p><strong>Status:</strong> {order.status || "Pending"}</p>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
