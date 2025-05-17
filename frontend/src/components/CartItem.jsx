import React from "react";
   
const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        backgroundColor: "#f9e6f2",
        padding: "15px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(255, 182, 193, 0.2)",
      }}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "10px",
          marginRight: "20px",
          boxShadow: "0 2px 8px rgba(214, 51, 108, 0.3)",
        }}
      />
      <div style={{ flexGrow: 1 }}>
        <h4 style={{ margin: "0 0 6px", color: "#d6336c", fontWeight: "600" }}>
          {item.name}
        </h4>
        <p style={{ margin: "0 0 6px", color: "#6f42c1", fontWeight: "500" }}>
          Price: ${item.price.toFixed(2)}
        </p>
        <p style={{ margin: "0 0 12px", color: "#a5698d", fontWeight: "500" }}>
          Quantity: {item.quantity}
        </p>

        <div>
          <button
            onClick={() => onIncrease(item.productId)}
            style={buttonStyle("#d6336c", "#b82c5a")}
          >
            +
          </button>
          <button
            onClick={() => onDecrease(item.productId)}
            style={buttonStyle("#f08eca", "#d87eb8", "#6f42c1")}
          >
            -
          </button>
          <button
            onClick={() => onRemove(item.productId)}
            style={buttonStyle("#f3c6e5", "#e3aed7", "#a5698d")}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = (bg, hover, color = "white") => ({
  padding: "6px 12px",
  marginRight: "8px",
  backgroundColor: bg,
  border: "none",
  borderRadius: "8px",
  color: color,
  cursor: "pointer",
  fontWeight: "600",
  boxShadow: `0 4px 8px ${bg}66`,
  transition: "background-color 0.3s ease",
  onMouseEnter: (e) => (e.target.style.backgroundColor = hover),
  onMouseLeave: (e) => (e.target.style.backgroundColor = bg),
});

export default CartItem;