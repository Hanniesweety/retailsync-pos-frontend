import { useState } from "react";

export default function Dashboard() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Laptop", price: 55000 },
    { id: 2, name: "Mobile Phone", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 },
    { id: 4, name: "Smart Watch", price: 5000 },
    { id: 5, name: "Keyboard", price: 1500 },
    { id: 6, name: "Mouse", price: 800 },
    { id: 7, name: "Monitor", price: 12000 },
    { id: 8, name: "Printer", price: 9000 },
    { id: 9, name: "Tablet", price: 18000 },
    { id: 10, name: "Speaker", price: 2500 }
  ];

  const addToCart = (p) => {
    setCart([...cart, p]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#f6f3ef",
      fontFamily: "Calibri, Segoe UI, sans-serif"
    }}>

      {/* SIDEBAR */}
      <div style={{
        width: "220px",
        background: "#fff",
        padding: "20px",
        borderRight: "1px solid #eee"
      }}>
        <h2 style={{ color: "#c9a96e" }}>🛍 RetailSync</h2>

        <div style={{ marginTop: "30px" }}>
          <p style={menuActive}>Shop</p>
          <p style={menu}>Orders</p>
          <p style={menu}>Customers</p>
          <p style={menu}>Products</p>
          <p style={menu}>Reports</p>
          <p style={menu}>Settings</p>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "20px" }}>

        {/* TOP BAR */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}>
          <input
            placeholder="Search for item..."
            style={searchBox}
          />
          <p>👤 User</p>
        </div>

        {/* PRODUCTS GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}>
          {products.map((p) => (
            <div key={p.id} style={card}>
              <div style={imageBox}></div>

              <h3>{p.name}</h3>
              <p style={{ fontWeight: "bold" }}>₹{p.price}</p>

              <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
                <button style={smallBtn}>Size</button>
                <button style={smallBtn}>Colour</button>
              </div>

              <button
                onClick={() => addToCart(p)}
                style={addBtn}
              >
                🛒 Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CART */}
      <div style={{
        width: "320px",
        background: "#fff",
        padding: "20px",
        borderLeft: "1px solid #eee"
      }}>
        <h3>Shopping Cart</h3>

        {cart.map((item, i) => (
          <div key={i} style={cartItem}>
            <p>{item.name}</p>
            <p>₹{item.price}</p>
          </div>
        ))}

        <hr />

        <p>Subtotal: ₹{total}</p>
        <p>Tax: ₹{Math.round(total * 0.05)}</p>

        <div style={totalBox}>
          Total ₹{total}
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const menu = {
  padding: "10px",
  color: "#777"
};

const menuActive = {
  padding: "10px",
  background: "#f3e9dc",
  borderRadius: "8px",
  color: "#c9a96e",
  fontWeight: "bold"
};

const searchBox = {
  width: "60%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const card = {
  background: "#fff",
  padding: "15px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
};

const imageBox = {
  height: "120px",
  background: "#eee",
  borderRadius: "10px",
  marginBottom: "10px"
};

const smallBtn = {
  flex: 1,
  padding: "6px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  background: "#fff"
};

const addBtn = {
  width: "100%",
  padding: "10px",
  background: "#d6c2a3",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const cartItem = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px"
};

const totalBox = {
  marginTop: "20px",
  padding: "15px",
  background: "#2c2c2c",
  color: "#fff",
  borderRadius: "10px",
  textAlign: "center"
};