import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const total = location.state?.total || 0;

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={success}>✅ Payment Successful</h1>

        <p style={text}>Thank you for your purchase 🛍️</p>

        <h2 style={amount}>₹ {total}</h2>

        <div style={{ marginTop: 20 }}>
          <button style={btn} onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>

          <button style={btn2}>
            View Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f6f3ef",
};

const card = {
  background: "#fff",
  padding: 40,
  borderRadius: 20,
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

const success = {
  color: "#4CAF50",
};

const text = {
  marginTop: 10,
  color: "#666",
};

const amount = {
  marginTop: 20,
  color: "#c9a96e",
};

const btn = {
  padding: 12,
  margin: 10,
  background: "#c9a96e",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
};

const btn2 = {
  padding: 12,
  margin: 10,
  background: "#eee",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
};