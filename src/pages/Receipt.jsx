import { useLocation, useNavigate } from "react-router-dom";

export default function Receipt() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cart = state?.cart || [];
  const total = state?.total || 0;

  return (
    <div style={container}>
      <div style={card}>
        <h2>🧾 Receipt</h2>

        <p>{new Date().toLocaleString()}</p>

        <hr />

        {cart.map((item) => (
          <div key={item.id} style={row}>
            <span>{item.name}</span>
            <span>
              {item.qty} x ₹{item.price}
            </span>
          </div>
        ))}

        <hr />

        <h3>Total: ₹{total}</h3>

        <button style={btn} onClick={() => window.print()}>
          Print
        </button>

        <button style={btn2} onClick={() => navigate("/dashboard")}>
          Back
        </button>
      </div>
    </div>
  );
}

/* 🎨 styles */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f6f3ef",
};

const card = {
  background: "#fff",
  padding: 30,
  borderRadius: 15,
  width: 350,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  margin: "10px 0",
};

const btn = {
  marginTop: 15,
  padding: 10,
  background: "#c9a96e",
  color: "#fff",
  border: "none",
  borderRadius: 8,
};

const btn2 = {
  marginTop: 10,
  padding: 10,
  background: "#ddd",
  border: "none",
  borderRadius: 8,
};