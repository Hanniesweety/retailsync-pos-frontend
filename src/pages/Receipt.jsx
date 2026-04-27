import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

export default function Receipt() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef();

  const cart = state?.cart || [];
  const total = state?.total || 0;

  const downloadPDF = async () => {
    const canvas = await html2canvas(receiptRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
    pdf.save("receipt.pdf");
  };

  return (
    <div style={container}>
      <div ref={receiptRef} style={card}>
        <h1 style={brand}>RetailSync POS</h1>
        <p style={sub}>Your Billing Receipt</p>

        <div style={divider}></div>

        <p style={date}>{new Date().toLocaleString()}</p>

        {cart.map((item) => (
          <div key={item.id} style={row}>
            <span>{item.name}</span>
            <span>{item.qty} x ₹{item.price}</span>
          </div>
        ))}

        <div style={divider}></div>

        <h2>Total: ₹ {total}</h2>

        <p style={thank}>
          Thank you for shopping in RetailSync POS 🛍️
        </p>

        <p style={team}>
          — By teammates of Hannie, Lakshmi, Lawerance, Shifil —
        </p>
      </div>

      {/* BUTTONS */}
      <div style={{ marginTop: 20 }}>
        <button style={btn} onClick={downloadPDF}>
          📄 Download PDF
        </button>

        <button style={btn} onClick={() => window.print()}>
          🖨️ Print
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
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#f5f2ed",
  fontFamily: "Calibri"
};

const card = {
  width: 350,
  background: "#fff",
  padding: 25,
  borderRadius: 15,
  textAlign: "center"
};

const brand = { color: "#c9a96e" };
const sub = { color: "#888" };
const date = { fontSize: 12 };

const row = {
  display: "flex",
  justifyContent: "space-between",
  margin: "6px 0"
};

const divider = {
  height: 1,
  background: "#eee",
  margin: "10px 0"
};

const thank = { marginTop: 10 };
const team = { fontSize: 12, color: "#888" };

const btn = {
  padding: 10,
  margin: 5,
  background: "#c9a96e",
  color: "#fff",
  border: "none",
  borderRadius: 8
};

const btn2 = {
  padding: 10,
  margin: 5,
  background: "#ddd",
  border: "none",
  borderRadius: 8
};