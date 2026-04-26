import { useLocation, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h2>No Product Found</h2>;

  const product = state;

  const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
  const currentRating = savedRatings[product.id] || 0;

  return (
    <div style={container}>
      
      <button onClick={() => navigate(-1)} style={backBtn}>
        ⬅ Back
      </button>

      <div style={card}>

        {/* IMAGE */}
        <div style={imgBox}>
          <img
            src={product.image}
            alt={product.name}
            style={img}
          />
        </div>

        {/* DETAILS */}
        <div style={info}>
          <h1>{product.name}</h1>
          <h2 style={price}>₹{product.price}</h2>

          <p style={desc}>
            {product.description}
          </p>

          {/* ⭐ Rating */}
          <div style={{ marginTop: 15 }}>
            {[1,2,3,4,5].map(star => (
              <span
                key={star}
                style={{
                  color: currentRating >= star ? "gold" : "#ccc",
                  fontSize: 22
                }}
              >
                ★
              </span>
            ))}
          </div>

          {/* Review */}
          <div style={reviewBox}>
            <h3>Customer Review</h3>
            <p>Good product 👍 worth price</p>
          </div>

          {/* BUTTON */}
          <button
            style={btn}
            onClick={() => {
              const cart = JSON.parse(localStorage.getItem("cart")) || [];

              const exist = cart.find(i => i.id === product.id);

              if (exist) {
                exist.qty += 1;
              } else {
                cart.push({ ...product, qty: 1 });
              }

              localStorage.setItem("cart", JSON.stringify(cart));

              alert("Added to cart ✅");

              navigate("/dashboard");
            }}
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}

/* 🎨 PREMIUM STYLES */

const container = {
  padding: 40,
  background: "#f6f3ef",
  minHeight: "100vh",
  fontFamily: "Calibri"
};

const backBtn = {
  marginBottom: 20,
  padding: 10,
  cursor: "pointer",
  border: "none",
  borderRadius: 8,
  background: "#ddd"
};

const card = {
  display: "flex",
  gap: 40,
  background: "#fff",
  padding: 30,
  borderRadius: 20,
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
};

const imgBox = {
  flex: 1,
  background: "#fafafa",
  padding: 20,
  borderRadius: 15,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const img = {
  width: "100%",
  height: 300,
  objectFit: "contain"
};

const info = {
  flex: 1
};

const price = {
  color: "#c9a96e",
  marginTop: 10
};

const desc = {
  marginTop: 15,
  lineHeight: 1.6,
  color: "#555"
};

const reviewBox = {
  marginTop: 20,
  padding: 15,
  background: "#f3e9dc",
  borderRadius: 12
};

const btn = {
  marginTop: 25,
  padding: 12,
  background: "#c9a96e",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: "bold"
};