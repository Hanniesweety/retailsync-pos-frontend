import { useLocation, useNavigate } from "react-router-dom";

export default function Receipt() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cart = state?.cart || [];
  const total = state?.total || 0;

  return (
    <div style={container}>
      <div style={card}>
        {/* HEADER */}
        <h1 style={brand}>RetailSync POS</h1>
        <p style={sub}>Billing Receipt</p>

        <div style={divider}></div>

        {/* DATE */}
        <p style={date}>{new Date().toLocaleString()}</p>

        {/* ITEMS */}
        <div style={{ marginTop: 15 }}>
          {cart.map((item) => (
            <div key={item.id} style={row}>
              <span>{item.name}</span>
              <span>
                {item.qty} x ₹{item.price}
              </span>
            </div>
          ))}
        </div>

        <div style={divider}></div>

        {/* TOTAL */}
        <h2 style={totalText}>Total: ₹ {total}</h2>

        {/* THANK YOU MESSAGE */}
        <p style={thank}>
          Thank you for shopping in RetailSync POS 🛍️
        </p>

        {/* TEAM FOOTER */}
        <p style={team}>
          — By teammates of Hannie, Lakshmi, Lawerance, Shifil —
        </p>

        {/* BUTTONS */}
        <div style={{ marginTop: 20 }}>
          <button style={btn} onClick={() => window.print()}>
            🖨️ Print
          </button>

          <button style={btn2} onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🎨 PREMIUM STYLES */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f5f2ed",
  fontFamily: "Calibri"
};

const card = {
  width: 380,
  background: "#fff",
  padding: 30,
  borderRadius: 18,
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  textAlign: "center"
};

const brand = {
  color: "#c9a96e",
  marginBottom: 5
};

const sub = {
  color: "#888",
  fontSize: 14
};

const date = {
  fontSize: 13,
  color: "#666"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  margin: "8px 0",
  fontSize: 15
};

const totalText = {
  marginTop: 10,
  color: "#333"
};

const thank = {
  marginTop: 15,
  fontSize: 14,
  color: "#444"
};

const team = {
  marginTop: 5,
  fontSize: 12,
  color: "#888"
};

const divider = {
  height: 1,
  background: "#eee",
  margin: "15px 0"
};

const btn = {
  padding: 10,
  margin: 8,
  background: "#c9a96e",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer"
};

const btn2 = {
  padding: 10,
  margin: 8,
  background: "#ddd",
  border: "none",
  borderRadius: 8,
  cursor: "pointer"
};